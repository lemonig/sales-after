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
import { demoSrc, mockUpload, mockUploadFail } from "../../utils/imgUpload";
import provinceJSON from "../../utils/province.json";
import ContactList from "../../components/ContactList";
import {
  workOrderList,
  faulttypeList,
  workOrderAdd,
} from "../../api/workorder";
import { contactList, cityList } from "../../api/public";
import { log } from "@craco/craco/lib/logger";

const provinceList = provinceJSON.map((item) => {
  return {
    value: item.code,
    label: item.name,
    key: item.code,
  };
});

function Work() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);
  const [typePickerData, setTypePickerData] = useState([[]]); //类型选项

  const [contactPopupVis, setContactPopupVis] = useState(false); //联系人弹框vis
  const [concated, setConcated] = useState({}); //已选择的联系人
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTypePickerData();
  }, []);

  const getTypePickerData = async () => {
    let { data } = await faulttypeList();
    let newdata = data.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    setTypePickerData([newdata]);
  };
  const back = () => {
    navigate(-1, { replace: true });
  };

  // 选择联系人
  const selectConcate = (val) => {
    setConcated(val);
    setContactPopupVis(false);
    form.setFieldsValue({
      linkman_id: val.id,
    });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    if (Array.isArray(values.photo)) {
      values.photo = values?.photo.map((item) => {
        return item.url;
      });
    }

    values.fault_type_id = values.fault_type_id[0];
    values.cityCode = values.cityCode[0];
    setLoading(true);
    let { success } = await workOrderAdd(values);
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
    // })
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
          label="选择类型"
          name="fault_type_id"
          rules={[{ required: true }]}
          onClick={(e, typePickerRef) => {
            typePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={typePickerData}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
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
            {([value]) => (value ? value.label : "请选择")}
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
        <Form.Header>以下为选填信息，有助于更快的解决问题</Form.Header>
        <Form.Item label="产品型号" name="model">
          <Input placeholder="请输入厂家、仪器、型号" />
        </Form.Item>
        <Form.Item label="照片" layout="vertical" name="photo">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            accept="image/*"
          />
        </Form.Item>
        <Form.Header />
      </Form>
      {/* 联系人弹窗 */}
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

export default Work;
