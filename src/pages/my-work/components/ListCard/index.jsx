import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal, Tag } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { AddOutline, EditSOutline, DeleteOutline } from "antd-mobile-icons";
import "./index.less";

function ListCard({ msg }) {
  let navigation = useNavigate();
  const gotoEnvalute = (params) => {
    navigation(`/evalute`);
  };
  const gotoLookupProgress = (params) => {
    navigation(`/progress`);
  };

  return (
    <Card style={{ borderRadius: "6px" }} className="list-card">
      <div className="head">
        <Tag color="default">{msg.tag}</Tag>
        <Tag color="#2db7f5">{msg.tag}</Tag>
      </div>
      <div className="content">
        <p>{msg.time}</p>
        <p>{msg.description}</p>
      </div>
      <div className="footer" onClick={(e) => e.stopPropagation()}>
        <span onClick={gotoEnvalute}>
          <EditSOutline color="var(--adm-color-primary)" />
          去评价
        </span>
        <span onClick={gotoLookupProgress}>
          {/* <DeleteOutline color="var(--adm-color-primary)" /> */}
          进度查询
        </span>
      </div>
    </Card>
  );
}

export default ListCard;
