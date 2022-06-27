import React from "react";
import { Rate, Space, Toast, TextArea, Button } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import TitleBar from "@Components/TitleBar";
import "./index.less";

function Evalute() {
  return (
    <div className="evalute-wrap">
      <TitleBar title="评价" />
      <div className="main">
        <Rate
          allowHalf
          defaultValue={2}
          character={<SmileOutline />}
          style={{ marginBottom: "18px" }}
        />
        <TextArea
          className="my-textarea"
          placeholder="专业能力，服务是否到位？"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
        <Button color="primary" fill="solid" style={{ width: "90%" }}>
          确认
        </Button>
      </div>
    </div>
  );
}

export default Evalute;
