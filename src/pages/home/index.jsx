import React from "react";
import {
  Button,
  Space,
  Swiper,
  Toast,
  Divider,
  Grid,
  Image,
} from "antd-mobile";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import IconFont from "../../components/IconFont";
import bannerImg from "../../assets/img/banner.jpg";
import "./index.less";

const colors = ["#ace0ff"];
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
    <div className="content" style={{ background: color }}>
      <Image src={bannerImg} />
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
        <Grid columns={3} gap={8}>
          {$menu}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
