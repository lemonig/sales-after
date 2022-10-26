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
  Picker,
  NumberKeyboard,
} from "antd-mobile";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import IconFont from "../../../components/IconFont";
import { connect } from "react-redux";
import store from "../../../store";
import {
  contactAdd,
  contactEdit,
  contactGetId,
  companyList,
} from "../../../api/contact";
import Map from "../../map";
import { isPhone } from "@Utils/validate";

function EditContact({ map, dispatch }) {
  const [isAdd, setIsAdd] = useState(true);
  const [pagedata, setPageData] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [mapAddr, setMapAddr] = useState(null); //地图选择
  const [loading, setLoading] = useState(false);
  const [componanyList, setComponanyList] = useState([]); //公司
  const [visible, setVisible] = useState(false); //数字键盘
  const [form] = Form.useForm();
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const formRule = [{ required: true }];
  let string = "";
  useEffect(() => {
    if (id) {
      setIsAdd(false);
      getComponanyList().then((_) => {
        getPageData();
      });
    } else {
      getComponanyList();
    }
  }, []);
  const getPageData = async () => {
    let { data } = await contactGetId({ id: id * 1 });
    form.setFieldsValue(data);
    setPageData(data);
  };
  const getComponanyList = async () => {
    let { data } = await companyList({ name: "" });
    const compoany = data.map((item) => {
      return {
        value: item.code,
        label: item.name,
        key: item.code,
      };
    });
    setComponanyList(compoany);
  };
  const back = () => {
    navigate(-1, { replace: true });
  };
  // 数字键盘
  const actions = {
    onClose: () => {
      // 触发表单检验
      // form.validateFields(["mobile"], (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      setVisible(false);
    },
    onInput: (key) => {
      const mobile = form.getFieldsValue().mobile;
      var newMobile = "";
      if (mobile) {
        newMobile = mobile + key;
      } else {
        newMobile = key;
      }
      form.setFieldsValue({
        mobile: newMobile,
      });
      form.validateFields(["mobile"], (err) => {
        if (err) {
          console.log(err);
        }
      });
    },
    onDelete: () => {
      const mobile = form.getFieldsValue().mobile;
      if (mobile) {
        form.setFieldsValue({
          mobile: mobile.substring(0, mobile.length - 1),
        });
      }
      form.validateFields(["mobile"], (err) => {
        if (err) {
          console.log(err);
        }
      });
    },
  };

  const submitForm = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    // values.address =
    //   mapAddr?.address?.city +
    //   mapAddr?.address?.district +
    //   mapAddr?.address?.township +
    //   mapAddr?.address?.street +
    //   mapAddr?.address?.city;
    values.coordinate1 = mapAddr?.lnglat?.lng;
    values.coordinate2 = mapAddr?.lnglat?.lat;
    setLoading(true);
    if (isAdd) {
      let { success, message } = await contactAdd(values);
      if (success) {
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        back();
      } else {
        Toast.show({
          content: message,
        });
      }
      setLoading(false);
    } else {
      values.id = id;
      let { success, message } = await contactEdit(values);
      if (success) {
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        back();
      } else {
        Toast.show({
          content: message,
        });
      }
      setLoading(false);
    }
  };

  const pageInit = async () => {};
  const gotoLocation = () => {
    setShowMap(true);
    // navigate("/map");
  };
  // 地图返回
  const handleMapBack = () => {
    setShowMap(false);
  };
  // 地图选择
  const handkeSeleteAddr = (val) => {
    setShowMap(false);
    setMapAddr(val);
    form.setFieldsValue({
      address:
        val?.address?.city +
        val?.address?.district +
        val?.address?.street +
        val?.address?.township,
      detailed_address: val.poi.name,
    });
  };

  const checkMobile = (_, value) => {
    // isPhone(value)
    if (value) {
      if (!isPhone(value)) {
        return Promise.reject(new Error("手机号格式不正确!"));
      }
    }
    return Promise.resolve();
  };

  return showMap ? (
    <Map
      handleMapBack={handleMapBack}
      handkeSeleteAddr={handkeSeleteAddr}
      lnglat={`${[pagedata.coordinate1, pagedata.coordinate2]}`}
    />
  ) : (
    <div>
      <NavBar back="返回" onBack={back}>
        {isAdd ? "新建" : "管理"}联系人
      </NavBar>
      {componanyList.length && (
        <Form
          form={form}
          layout="horizontal"
          mode="card"
          footer={
            <Button
              block
              color="primary"
              size="large"
              onClick={submitForm}
              loading={loading}
            >
              提交
            </Button>
          }
        >
          <Form.Header>联系人信息</Form.Header>

          <Form.Item
            label="联系人公司"
            name="linkman_company"
            rules={[{ required: true }, { type: "string", max: 20 }]}
          >
            <Input placeholder="请输入" />
            {/* {
              <Picker columns={[componanyList]}>
                {([value]) =>
                  value ? (
                    value.label
                  ) : (
                    <span className="placer-hoder-text">请选择</span>
                  )
                }
              </Picker>
            } */}
          </Form.Item>
          <Form.Item
            label="联系人"
            name="name"
            rules={[{ required: true }, { type: "string", max: 20 }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="手机号"
            validateTrigger="onBlur"
            // rules={[{ required: true }]}
            rules={[{ required: true }, { validator: checkMobile }]}
            name="mobile"
          >
            <Input
              placeholder="请输入"
              type="tel"
              // onBlur={actions.onClose}
              // readonly="readonly"
              // onFocus={() => {
              //   document.activeElement.blur(); //禁止原生键盘
              //   setVisible(true);
              // }}
            />
          </Form.Item>

          {/* <Form.Item
            name="address"
            label="所在地区"
            extra={
              <div onClick={gotoLocation}>
                <IconFont
                  iconName="dingwei"
                  className=""
                  style={{ color: "#7cfc00" }}
                />
              </div>
            }
            rules={formRule}
          >
            <Input placeholder="请输入" />
          </Form.Item> */}
          <Form.Item label="联系地址" name="detailed_address">
            <Input placeholder="请输入" />
            {/* <p>{mapAddr?.poi.name}</p> */}
          </Form.Item>
        </Form>
      )}
      <NumberKeyboard
        visible={visible}
        onClose={actions.onClose}
        onInput={actions.onInput}
        onDelete={actions.onDelete}
      />
    </div>
  );
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(EditContact);
