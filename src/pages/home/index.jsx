import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Swiper,
  Toast,
  Divider,
  Grid,
  Image,
  Modal,
} from "antd-mobile";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import IconFont from "../../components/IconFont";
import bannerImg from "../../assets/img/banner.jpg";
import "./index.less";

const colors = ["#1866BB"];
const menuList = [
  {
    icon: "gongdan-xinjiangongdancopy",
    name: "提交工单",
    path: "/work",
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
    <NavLink to={menu.path}>
      <div className="menu-item">
        <IconFont iconName={menu.icon} size="16" />
        <p>{menu.name}</p>
      </div>
    </NavLink>
  </Grid.Item>
));
function Home() {
  let navigate = useNavigate();
  let [user, setUser] = useState();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
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
        <p>预约服务</p>
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
      <p className="login-out-btn">
        登录手机号：{user?.mobile}
        <a target="_blank" onClick={loginOut}>
          退出登录
        </a>
      </p>
    </div>
  );
}

export default Home;
