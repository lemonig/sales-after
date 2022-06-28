import React, { useEffect, useState } from "react";
import { Card, Toast, Button, NavBar, Space, Modal } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import "./index.less";
import { useNavigate } from "react-router-dom";
import { AddOutline, EditSOutline, DeleteOutline } from "antd-mobile-icons";
import { contactList, contactDelete } from "../../api/contact";

function Contacts() {
  let navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    console.log("联系人");
    getPageData();
  }, []);

  const getPageData = async () => {
    let { data } = await contactList();
    console.log(data);
    setPageData(data);
  };
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
  const handleDelContact = (id) => {
    Modal.confirm({
      title: "提示",
      content: "确认删除联系人吗",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        console.log("Confirmed");
        let { success } = contactDelete({ id: id });
        if (success) {
          Toast.show({
            icon: "success",
            content: "删除成功",
          });
        }
        getPageData();
      },
      onCancel: () => {
        console.log("Confirmed");
      },
    });
  };
  const handleEditContact = (id) => {
    navigate({
      pathname: "/contactEdit",
      search: `?id=${id}`,
    });
  };
  const handleAddContact = () => {
    navigate("/contactEdit");
  };

  const $card = () => {
    return pageData.map((item) => (
      <Card
        key={item.id}
        onBodyClick={onBodyClick}
        onHeaderClick={onHeaderClick}
        style={{ borderRadius: "6px" }}
      >
        <div className="content">
          <p>
            {item.name} {item.mobile}
          </p>
          <p>
            {item.address}
            {item.detailed_address}
          </p>
        </div>
        <div className="footer" onClick={(e) => e.stopPropagation()}>
          <span onClick={() => handleDelContact(item.id)}>
            <DeleteOutline color="var(--adm-color-primary)" />
            删除
          </span>
          <span onClick={() => handleEditContact(item.id)}>
            <EditSOutline color="var(--adm-color-primary)" />
            编辑
          </span>
        </div>
      </Card>
    ));
  };

  return (
    <div className="contacts-wrap">
      <NavBar back="返回" onBack={back}>
        管理联系人
      </NavBar>
      <div className="btn-top">
        <Button onClick={handleAddContact}>
          <Space>
            <AddOutline />
            <span>添加联系人</span>
          </Space>
        </Button>
      </div>
      {$card()}
    </div>
  );
}

export default Contacts;
