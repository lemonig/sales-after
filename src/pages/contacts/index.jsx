import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import "./index.less";
import { useNavigate } from "react-router-dom";
import { AddOutline, EditSOutline, DeleteOutline } from "antd-mobile-icons";

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
    navigate("/contactEdit/1");
  };
  return (
    <div className="contacts-wrap">
      <NavBar back="返回" onBack={back}>
        管理联系人
      </NavBar>
      <div className="btn-top">
        <Button>
          <Space>
            <AddOutline />
            <span>添加联系人</span>
          </Space>
        </Button>
      </div>
      <Card
        onBodyClick={onBodyClick}
        onHeaderClick={onHeaderClick}
        style={{ borderRadius: "6px" }}
      >
        <div className="content">
          <p>张金民 13505415263</p>
          <p>浙江省嘉兴市平湖市通界桥路1号</p>
        </div>
        <div className="footer" onClick={(e) => e.stopPropagation()}>
          <span onClick={handleDelContact}>
            <DeleteOutline color="var(--adm-color-primary)" />
            删除
          </span>
          <span onClick={handleEditContact}>
            <EditSOutline color="var(--adm-color-primary)" />
            编辑
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Contacts;
