import React, { RefObject } from "react";
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  Toast,
} from "antd-mobile";
import { captcha, login } from "../../api/public";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { useState } from "react";

function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [sendCoded, setSendCoded] = useState(false); //是否已发送验证码
  let [count, setCount] = useState(60); //倒计时
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
          <Input placeholder="请输入手机号码" />
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
          <Input placeholder="请输入短信验证码" />
        </Form.Item>
        <Form.Item name="name">
          <Input placeholder="请输入您的姓名" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
