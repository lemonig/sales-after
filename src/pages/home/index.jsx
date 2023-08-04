import React, { useEffect, useState } from "react";
import {
  Swiper,
  Divider,
  Grid,
  Modal,
  Form,
} from "antd-mobile";
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import IconFont from "../../components/IconFont";
import "./index.less";
import { _get, _post } from "../../server/http";

const colors = ["#1866BB"];
const menuList = [
  {
    icon: "quizz-icon",
    name: "咨询服务",
    path: "/work",
    id: '1'
  },
  {
    icon: "gongdan-xinjiangongdancopy",
    name: "报修服务",
    path: "/work",
    id: '2'
  },

  {
    icon: "cylxr",
    name: "我的联系人",
    path: "/contacts",
  },
  {
    icon: "wodegongdan",
    name: "我的工单",
    path: "/mywork",
  },
  {
    icon: "tousu",
    name: "投诉建议",
    path: "/complain",
  },
  {
    icon: "shenqingcaigou-",
    name: "配件购买",
    path: "/armature",
  },
  {
    icon: "caigoudingdan-bian",
    name: "我的配件",
    path: "/my-armature",
  },
];
const banner = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div className="content">
      <p>全面服务 专业保障</p>
      <p>集成 仪器 软件</p>
      {/* <Image src={bannerImg} /> */}
    </div>
  </Swiper.Item>
));
const $menu = menuList.map((menu, index) => (
  <Grid.Item key={index}>
    <NavLink to={{
      pathname: menu.path,
      search: `?id=${menu.id}`
    }} >
      <div className="menu-item">
        <IconFont iconName={menu.icon} size="16" />
        <p>{menu.name}</p>
      </div>
    </NavLink>
  </Grid.Item>
));
function Home() {
  let navigate = useNavigate();
  let code = new URLSearchParams(useLocation().search).get("code");

  const [popupVis, setPopupVis] = useState(false);

  const [form] = Form.useForm();
  const [sendCoded, setSendCoded] = useState(false); //是否已发送验证码
  let [count, setCount] = useState(60); //倒计时
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("code-----------" + code);
    if (code) {
      _post(`api/login`, { code: code }).then((res) => {
        if (res.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      });
    }
  }, []);

  const loginOut = () => {
    Modal.confirm({
      title: "提示",
      content: "确认更换当前登录",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        localStorage.clear();
        navigate("/login");
      },
      onCancel: () => {
        // console.log("Confirmed");
      },
    });
  };

  return (
    <div className="home-wrap">
      <Swiper>{banner}</Swiper>
      <div className="menu-wrap">
        <p>我的服务</p>
        <Divider
          style={{
            borderColor: "#bbbbbb",
            margin: "8px 0",
          }}
        ></Divider>
        <Grid columns={3} gap={8} className="my-grid">
          {$menu}
        </Grid>
      </div>
      {/* <p className="login-out-btn">
        登录手机号：{user?.mobile}
        <a target="_blank" onClick={loginOut}>
          退出登录
        </a>
      </p> */}
    </div>
  );
}

export default Home;
