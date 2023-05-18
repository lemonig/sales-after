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
import {
  workOrderList,
  faulttypeList,
  workOrderAdd,
} from "../../api/workorder";
import { contactList, cityList as cityListApi } from "../../api/public";
import { log } from "@craco/craco/lib/logger";

const provinceList = provinceJSON.map((item) => {});

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
  const [photpRule, setPhotpRule] = useState(null);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    getTypePickerData();
    getCityList();
  }, []);

  const getTypePickerData = async () => {
    let { data } = await faulttypeList();
    let newdata = data.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    setTypePickerData([newdata]);
  };
  const getCityList = async () => {
    let { data } = await cityListApi();
    let newD = data.map((item) => ({
      value: item.code,
      label: item.name,
      key: item.code,
    }));

    setCityList(newD);
  };
  const back = () => {
    navigate(-1, { replace: true });
  };

  // 选择联系人
  const selectConcate = (val) => {
    if (!!val) {
      setConcated(val);
      setContactPopupVis(false);
      form.setFieldsValue({
        linkman_id: val.id,
      });
    }
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
      setLoading(false);
    }
    // })
  };

  const onTypeSelected = (value) => {
    console.log(value);
    if (value.toString() === "2") {
      console.log(11);
      setPhotpRule({ required: true, message: "请上传照片" });
    } else {
      setPhotpRule(null);
    }
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
          label="现场联系人"
          name="linkman_id"
          rules={[{ required: true }]}
          onClick={() => {
            setContactPopupVis(true);
          }}
        >
          {concated.name ? (
            <>
              <p>
                {concated.name} {concated.mobile}
              </p>
              <p>{concated.address}</p>
            </>
          ) : (
            <span className="placer-hoder-text">
              请添加您的真实联系方式，方便服务工程师联系您
            </span>
          )}
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
          <Picker columns={typePickerData} onConfirm={onTypeSelected}>
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
          label="选择省份"
          name="cityCode"
          rules={[{ required: true }]}
          onClick={(e, provincePickerRef) => {
            provincePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[cityList]}>
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
        <Form.Header>以下为选填信息，有助于更快的解决问题</Form.Header>
        <Form.Item label="产品型号" name="model">
          <Input placeholder="请输入厂家、仪器、型号" />
        </Form.Item>
        <Form.Item label="产品编码" name="model_code">
          <Input placeholder="请输入产品编码" />
        </Form.Item>
        <Form.Item
          label="照片"
          layout="vertical"
          name="photo"
          rules={photpRule ? [photpRule] : null}
        >
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            showFailed={false}
            accept="image/*"
            maxCount={3}
            beforeUpload={beforeUpload}
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
