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

function EditContact({ map, dispatch }) {
  const [isAdd, setIsAdd] = useState(true);
  const [pagedata, setPageData] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [mapAddr, setMapAddr] = useState(null); //地图选择
  const [loading, setLoading] = useState(false);
  const [componanyList, setComponanyList] = useState([]); //公司

  const [form] = Form.useForm();
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const formRule = [{ required: true }];

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
    data.company_code = [data.company_code];
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
    values.company_code = values.company_code[0];
    setLoading(true);
    if (isAdd) {
      let { success, data } = await contactAdd(values);
      if (success) {
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        back();
      } else {
        Toast.show({
          content: data,
        });
      }
      setLoading(false);
    } else {
      values.id = id;
      let { success, data } = await contactEdit(values);
      if (success) {
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        back();
      } else {
        Toast.show({
          content: data,
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
            label="选择所属公司"
            name="company_code"
            rules={[{ required: true }]}
            onClick={(e, comPickerRef) => {
              comPickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            {
              <Picker columns={[componanyList]}>
                {([value]) =>
                  value ? (
                    value.label
                  ) : (
                    <span className="placer-hoder-text">请选择</span>
                  )
                }
              </Picker>
            }
          </Form.Item>
          <Form.Item label="联系人" name="name" rules={formRule}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="手机号" rules={formRule} name="mobile">
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="address"
            label="所在地区"
            extra={
              <div onClick={gotoLocation}>
                <IconFont iconName="dingwei" className="" />
              </div>
            }
            rules={formRule}
          >
            <Input placeholder="请输入" />
            {/* <p>
             {mapAddr?.address?.city}
             {mapAddr?.address?.district}
             {mapAddr?.address?.township}
             {mapAddr?.address?.street}
           </p> */}
          </Form.Item>
          <Form.Item label="详细地址" rules={formRule} name="detailed_address">
            <Input placeholder="请输入" />
            {/* <p>{mapAddr?.poi.name}</p> */}
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(EditContact);
