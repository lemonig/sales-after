import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal, Tag } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { AddOutline, EditSOutline, DeleteOutline } from "antd-mobile-icons";
import "./index.less";
import { orderStatus } from "../../../../utils/constant";
import moment from "moment";

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
      pathname: `/progress/${id}`,
    });
    // navigate({
    //   pathname: `/progress`,
    // search: `?id=${id}`,
    //   // search: `?id=${id}`,
    // });
  };

  return (
    <Card
      style={{ borderRadius: "6px" }}
      className="list-card"
      onBodyClick={() => gotoLookupProgress(msg.id)}
    >
      <div className="head">
        {/* <Tag color="default">{msg.fault_type}</Tag> */}
      </div>
      <div className="content">
        <p>
          <span>服务单号 {msg.service_code}</span>

          <Tag
            color="#2db7f5"
            // style={{
            //   "--background-color": "#e6cfe6",
            //   "--text-color": "#1677ff",
            // }}
          >
            {msg.fault_type}
          </Tag>
        </p>
        <p>提交日期 {moment(msg.gmt_create).format("YYYY-MM-DD")}</p>
        <p className="desc"> {msg.describe}</p>
        <p>
          {msg.submitter} {msg.cityName}
        </p>
      </div>
      <div className="footer" onClick={(e) => e.stopPropagation()}>
        <Space>
          {msg.status === 5 ? (
            <Button
              color="primary"
              fill="outline"
              onClick={() => gotoEnvalute(msg.id)}
              size="mini"
            >
              去评价
            </Button>
          ) : // <span onClick={() => gotoEnvalute(msg.id)}>
          //   <EditSOutline color="var(--adm-color-primary)" />
          //   去评价
          // </span>
          null}
          <Button
            color="primary"
            fill="outline"
            onClick={() => gotoLookupProgress(msg.id)}
            size="mini"
          >
            进度查询
          </Button>
          {/* <span onClick={() => gotoLookupProgress(msg.id)}>
          进度查询
        </span> */}
        </Space>
      </div>
    </Card>
  );
}

export default ListCard;
