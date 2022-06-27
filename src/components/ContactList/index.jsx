import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal, Radio } from "antd-mobile";
import "./index.less";
import { useNavigate } from "react-router-dom";
import {
  AddOutline,
  EditSOutline,
  DeleteOutline,
  SmileOutline,
  SmileFill,
} from "antd-mobile-icons";
const msg = [
  {
    name: "张金民 13505415263",
    add: "浙江省嘉兴市平湖市通界桥路1号",
  },
  {
    name: "张金民1 11105415263",
    add: "浙江省杭州市平湖市通界桥路dd1号",
  },
];
function Contacts() {
  let navigate = useNavigate();

  const onClick = () => {
    Toast.show("点击了卡片");
  };

  const onHeaderClick = () => {
    Toast.show("点击了卡片Header区域");
  };

  const onBodyClick = () => {
    Toast.show("点击了卡片Body区域");
  };

  const back = () => {
    navigate(-1, { replace: true });
  };
  const handleDelContact = () => {
    Modal.confirm({
      title: "提示",
      content: "确认删除联系人吗",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        console.log("Confirmed");
      },
      onCancel: () => {
        console.log("Confirmed");
      },
    });
  };
  const handleEditContact = () => {
    navigate({
      pathname: "/contactEdit",
      search: "?id=1",
    });
  };
  const handleAddContact = () => {
    navigate("/contactEdit");
  };
  const $concat = () => {
    return msg.map((item) => (
      <div className="list-item" key={item.name}>
        <Radio
          className="my-radio"
          value="radio1"
          icon={(checked) =>
            checked ? (
              <SmileFill style={{ color: "var(--adm-color-primary)" }} />
            ) : (
              <SmileOutline style={{ color: "var(--adm-color-weak)" }} />
            )
          }
        ></Radio>
        <Card
          onBodyClick={onBodyClick}
          onHeaderClick={onHeaderClick}
          style={{ borderRadius: "6px" }}
        >
          <div className="content">
            <p>{item.name}</p>
            <p>{item.add}</p>
          </div>
          <div className="footer" onClick={(e) => e.stopPropagation()}>
            <span onClick={handleDelContact}>
              <DeleteOutline color="var(--adm-color-primary)" />
              删除
            </span>
            <span onClick={handleEditContact}>
              <EditSOutline color="var(--admhandleAddConcate-color-primary)" />
              编辑
            </span>
          </div>
        </Card>
      </div>
    ));
  };

  return (
    <div className="contacts-wrap">
      <div className="btn-top">
        <Button onClick={handleAddContact}>
          <Space>
            <AddOutline />
            <span>添加联系人</span>
          </Space>
        </Button>
      </div>
      <div className="contact-list">{$concat()}</div>
      <div className="btn-bottom">
        <Button color="primary" fill="solid" style={{ width: "90%" }}>
          确认
        </Button>
      </div>
    </div>
  );
}

export default Contacts;
