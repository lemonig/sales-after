import React, { useState, useEffect, RefObject } from "react";
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
  NavBar,
  Space,
  Picker,
  ImageUploader,
  Popup,
  Tag,
  Card,
  Image,
  List,
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { RightOutline, AntOutline } from "antd-mobile-icons";
import { users } from "./user";
import { armatureList } from "../../api/armature";

const bodyStyle = {
  border: "1px solid #eee",
};

const sesc_style = {
  fontSize: "16px",
};

function Armature() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPageData() {
      let { data } = await armatureList();
      setData(data);
    }
    getPageData();
  }, []);

  const back = () => {
    navigate(-1, { replace: true });
  };
  const wrap = {
    padding: "20px 0",
  };

  return (
    <div>
      <NavBar back="返回" onBack={back}>
        我的采购单
      </NavBar>
      <div style={wrap}>
        <List>
          {data.map((user) => (
            <List.Item
              key={user.id}
              extra={
                <>
                  {user.deal_status ? (
                    <Tag color="primary" fill="outline">
                      {user.deal_status}
                    </Tag>
                  ) : null}
                </>
              }
              description={
                <>
                  <p style={sesc_style}>{user.accessory_shoplist}</p>
                  <p style={sesc_style}>{user.linkman_name}</p>
                </>
              }
            >
              提交时间：{dayjs(user.gmt_create).format("YYYY-MM-DD")}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Armature;
