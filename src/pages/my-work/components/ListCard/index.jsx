import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal, Tag } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { AddOutline, EditSOutline, DeleteOutline } from "antd-mobile-icons";
import "./index.less";
import { orderStatus } from "../../../../utils/constant";

function ListCard({ msg }) {
  let navigate = useNavigate();
  const gotoEnvalute = (id) => {
    navigate({
      pathname: "/evalute",
      search: `?id=${id}`,
    });
  };
  const gotoLookupProgress = (id) => {
    navigate({
      pathname: "/progress",
      search: `?id=${id}`,
    });
  };

  return (
    <Card style={{ borderRadius: "6px" }} className="list-card">
      <div className="head">
        <Tag color="default">{msg.fault_type}</Tag>
        <Tag color="#2db7f5">{orderStatus(msg.status)}</Tag>
      </div>
      <div className="content">
        <p>{msg.gmt_create}</p>
        <p>{msg.describe}</p>
      </div>
      <div className="footer" onClick={(e) => e.stopPropagation()}>
        {msg.status === 5 ? (
          <span onClick={() => gotoEnvalute(msg.id)}>
            <EditSOutline color="var(--adm-color-primary)" />
            去评价
          </span>
        ) : null}

        <span onClick={() => gotoLookupProgress(msg.id)}>
          {/* <DeleteOutline color="var(--adm-color-primary)" /> */}
          进度查询
        </span>
      </div>
    </Card>
  );
}

export default ListCard;
