import React, { useState, useEffect } from "react";
import {
  Card,
  Toast,
  Button,
  NavBar,
  Space,
  Modal,
  Form,
  Input,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import IconFont from "../../../components/IconFont";
import { connect } from "react-redux";
import store from "../../../store";

function EditContact({ map, dispatch }) {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const formRule = [{ required: true }];
  useEffect(() => {}, []);

  const back = () => {
    navigate(-1, { replace: true });
  };

  const submitForm = () => {
    const values = form.getFieldsValue();
  };
  const gotoLocation = () => {
    navigate("/map");
  };
  return (
    <div>
      <NavBar back="返回" onBack={back}>
        管理联系人
      </NavBar>
      <Form
        form={form}
        layout="horizontal"
        mode="card"
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            submitForm={submitForm}
          >
            提交
          </Button>
        }
      >
        <Form.Header>联系人信息</Form.Header>
        <Form.Item name="concate" label="联系人" rules={formRule}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="phone" label="手机号" rules={formRule}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="city"
          label="所在地区"
          extra={
            <div
              style={{ width: "50px", height: "50px", background: "#eee" }}
              onClick={gotoLocation}
            >
              {/* <IconFont name="dingwei" className="" /> */}
            </div>
          }
          rules={formRule}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="area" label="详细地址" rules={formRule}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(EditContact);
