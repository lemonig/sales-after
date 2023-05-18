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
  Toast,
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  demoSrc,
  mockUpload,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import provinceJSON from "../../utils/province.json";
import ContactList from "../../components/ContactList";
import { armatureAdd } from "../../api/armature";

const provinceList = provinceJSON.map((item) => {
  return {
    value: item.code,
    label: item.name,
    key: item.code,
  };
});

function Armature() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);

  const [contactPopupVis, setContactPopupVis] = useState(false);
  const [concated, setConcated] = useState({}); //已选择的联系人
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    setLoading(true);
    let { success } = await armatureAdd(values);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      back();
    } else {
      Toast.show({
        icon: "fail",
        content: "失败",
      });
    }
    setLoading(false);
  };

  // 选择联系人
  const selectConcate = (val) => {
    setConcated(val);
    setContactPopupVis(false);
    form.setFieldsValue({
      linkman_id: val.id,
    });
  };
  return (
    <>
      <NavBar back="返回" onBack={back}>
        购买申请
      </NavBar>
      <Form
        layout="horizontal"
        // mode="card"
        form={form}
        footer={
          <Button
            block
            color="primary"
            onClick={onSubmit}
            size="large"
            loading={loading}
          >
            提交
          </Button>
        }
      >
        <Form.Item
          label="联系人"
          name="linkman_id"
          rules={[{ required: true }]}
          onClick={() => {
            setContactPopupVis(true);
          }}
        >
          <p>
            {concated.name} {concated.mobile}
          </p>
          <p>{concated.address}</p>
        </Form.Item>

        <Form.Item
          label="描述"
          layout="vertical"
          name="accessory_shoplist"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入内容" rows={3} />
        </Form.Item>

        <Form.Header />
      </Form>
      <Popup
        visible={contactPopupVis}
        onMaskClick={() => {
          setContactPopupVis(false);
        }}
        bodyStyle={{ height: "80vh" }}
      >
        <ContactList selectConcate={selectConcate}></ContactList>
      </Popup>
    </>
  );
}

export default Armature;
