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
    // localStorage.setItem("token", "ae18097b614774afea92e435208b55658");
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
