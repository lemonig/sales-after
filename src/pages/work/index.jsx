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
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { demoSrc, mockUpload, mockUploadFail } from "../../utils/imgUpload";

function Work() {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);
  const [typePickerData, setTypePickerData] = useState([
    [
      {
        label: "信息咨询",
        value: "001",
      },
      {
        label: "业务报修",
        value: "002",
      },
    ],
  ]); //类型选项
  const [typeVisible, setTypeVisible] = useState(false);

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = () => {
    const values = form.getFieldsValue();
  };
  return (
    <>
      <NavBar back="返回" onBack={back}>
        提交服务单
      </NavBar>
      <Form
        layout="horizontal"
        // mode="card"
        form={form}
        footer={
          <Button block color="primary" onClick={onSubmit} size="large">
            提交
          </Button>
        }
      >
        <Form.Item
          name="contact"
          label="联系人"
          trigger="onConfirm"
        ></Form.Item>
        <Form.Item label="选择类型" name="type">
          <Input
            placeholder="请输入"
            trigger="onConfirm"
            onClick={() => {
              setTypeVisible(true);
            }}
            extra
          />
          <Picker
            columns={typePickerData}
            visible={typeVisible}
            onClose={() => {
              setTypeVisible(false);
            }}
          />
        </Form.Item>
        <Form.Item label="选择省份" name="province">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述" layout="vertical" name="desc">
          <TextArea placeholder="请输入内容" rows={3} />
        </Form.Item>
        <Form.Header>以下为选填信息，有助于更快的解决问题</Form.Header>
        <Form.Item label="产品型号" name="version">
          <Input placeholder="请输入厂家、仪器、型号" />
        </Form.Item>
        <Form.Item label="照片" layout="vertical">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
          />
        </Form.Item>
        <Form.Header />
      </Form>
    </>
  );
}

export default Work;
