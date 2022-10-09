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
import { complaintAdd } from "../../api/complain";

const provinceList = provinceJSON.map((item) => {
  return {
    value: item.code,
    label: item.name,
    key: item.code,
  };
});

function Complain() {
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
    values.cityCode = values.cityCode[0];
    if (Array.isArray(values.photo)) {
      values.photo = values?.photo.map((item) => {
        return item.url;
      });
    }
    setLoading(true);
    let { success } = await complaintAdd(values);
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
        投诉建议
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
          label="选择省份"
          name="cityCode"
          rules={[{ required: true }]}
          onClick={(e, provincePickerRef) => {
            provincePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[provinceList]}>
            {([value]) =>
              value ? (
                value.label
              ) : (
                <span className="placer-hoder-text">请选择</span>
              )
            }
          </Picker>
        </Form.Item>

        <Form.Item
          label="描述"
          layout="vertical"
          name="describe"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入内容" rows={3} />
        </Form.Item>

        <Form.Item label="照片" layout="vertical" name="photo">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            maxCount={3}
            beforeUpload={beforeUpload}
          />
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

export default Complain;
