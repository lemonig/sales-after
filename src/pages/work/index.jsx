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
  NavBar,
  Space,
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function Work() {
  let navigate = useNavigate();
  const back = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
      <NavBar back="返回" onBack={back}>
        提交服务单
      </NavBar>
      <Form layout="horizontal" mode="card">
        <Form.Header>卡片模式及分组</Form.Header>
        <Form.Item
          name="birthday"
          label="联系人"
          trigger="onConfirm"
          onClick={(e, datePickerRef) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item label="短信验证码">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Header />
        <Form.Item label="姓名">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="邮箱地址">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="所在城市">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Header />
      </Form>
      <Form layout="horizontal" mode="card">
        <Form.Header>带辅助操作</Form.Header>
        <Form.Item label="短信验证码" extra={<a>发送验证码</a>}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </>
  );
}

export default Work;
