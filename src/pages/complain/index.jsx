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
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { demoSrc, mockUpload, mockUploadFail } from "../../utils/imgUpload";
import provinceJSON from "../../utils/province.json";
import ContactList from "../../components/ContactList";

function Complain() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);

  const [contactPopupVis, setContactPopupVis] = useState(false);

  useEffect(() => {
    console.log(form);
  }, []);

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };
  return (
    <>
      <NavBar back="返回" onBack={back}>
        投诉建议
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
          label="联系人"
          name="type"
          rules={[{ required: true }]}
          onClick={() => {
            setContactPopupVis(true);
          }}
        >
          <Popup
            visible={contactPopupVis}
            onMaskClick={() => {
              setContactPopupVis(false);
            }}
            bodyStyle={{ height: "80vh" }}
          >
            <ContactList></ContactList>
          </Popup>
        </Form.Item>

        <Form.Item
          label="选择省份"
          name="province"
          rules={[{ required: true }]}
          onClick={(e, provincePickerRef) => {
            provincePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker
            columns={[
              provinceJSON.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  key: item.code,
                };
              }),
            ]}
          >
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>

        <Form.Item
          label="描述"
          layout="vertical"
          name="desc"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入内容" rows={3} />
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

export default Complain;
