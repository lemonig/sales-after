import React, { RefObject, useEffect } from "react";
import { Form, Input, Button, Toast } from "antd-mobile";
import { captcha, login, tokenCheck } from "../../api/public";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { useState } from "react";
import { _get } from "../../server/http";

function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [sendCoded, setSendCoded] = useState(false); //是否已发送验证码
  let [count, setCount] = useState(60); //倒计时

  useEffect(() => {
    isLogin();
    // getTicket();
  }, []);

  const isLogin = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let { success } = await tokenCheck({ token });
      if (success) {
        navigate("/");
      }
    }
  };

  let appSecret = "55e91f0b60d0d43ba81b97850d6a4ca6";
  let appId = "wxdab09e765e958bef";
  const getTicket = () => {
    _get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
    ).then((res) => {
      console.log(res);
    });
  };

  const wxLogin = () => {
    window.wx.config({
      debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
      appId: "gh_2e158b82f997", // 必填，公众号的唯一标识
      timestamp: new Date(), // 必填，生成签名的时间戳
      nonceStr: "", // 必填，生成签名的随机串
      signature: "", // 必填，签名
      jsApiList: [], // 必填，需要使用的 JS 接口列表
    });
  };

  let codeTimer = null;
  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    let { success, data } = await login(values);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      Toast.show(data);
    }
  };
  const sendCode = async () => {
    let phone = form.getFieldsValue("phone");
    let { data, success } = await captcha(phone);
    if (success) {
      setSendCoded(true);
      countDown();
      Toast.show(data);
    } else {
      Toast.show(data);
    }
    // form.setFieldsValue({
    //   code,s
    // });
  };
  const countDown = () => {
    codeTimer = setInterval(() => {
      setCount(count--);
      if (count === 0) {
        clearInterval(codeTimer);
        codeTimer = null;
        setSendCoded(false);
        setCount(60);
      }
    }, 1000);
  };
  return (
    <div className="login-contain">
      <p className="title">欢迎登录</p>
      <Form
        layout="horizontal"
        mode="card"
        form={form}
        footer={
          <Button block color="primary" onClick={onSubmit} size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="phone">
          <Input placeholder="请输入手机号码" type="number" />
        </Form.Item>
        <Form.Item
          name="code"
          extra={
            sendCoded ? (
              <span>{count}秒后重试</span>
            ) : (
              <Button color="primary" fill="none" onClick={sendCode}>
                发送验证码
              </Button>
            )
          }
        >
          <Input placeholder="请输入短信验证码" type="number" />
        </Form.Item>
        <Form.Item name="name">
          <Input placeholder="请输入您的姓名" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
