import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { captcha, login, tokenCheck } from "../../api/public";
import "./index.less";

const LoginToHome = () => {
  let navigate = useNavigate();
  useEffect(() => {
    isLogin();
  }, []);
  const isLogin = async () => {
    // let token = "ae0259b5006c24e14803684a3a7f81e37";
    // localStorage.setItem("token", "a87a62c9ab31c45d19e0c41c7ccd6d187");
    // navigate("/", { replace: true });
    let token = localStorage.getItem("token");
    if (token) {
      let { success } = await tokenCheck({ token });
      if (success) {
        navigate("/", { replace: true });
      } else {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8dff0d2efdec1139&redirect_uri=http%3A%2F%2Fportal.greandata1.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      }
    } else {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8dff0d2efdec1139&redirect_uri=http%3A%2F%2Fportal.greandata1.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
  };
  return (
    <div className="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoginToHome;
