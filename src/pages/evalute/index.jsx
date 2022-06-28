import React, { useEffect, useState } from "react";
import { Rate, Space, Toast, TextArea, Button } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import TitleBar from "@Components/TitleBar";
import "./index.less";
import { evaluate } from "../../api/evalute";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
function Evalute() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [pageData, setPageData] = useState([]);
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(1);

  useEffect(() => {}, []);
  const handleEvalute = async () => {
    let eva = 0;
    if (score < 2) {
      eva = 1;
    } else if (score < 4) {
      eva = 2;
    } else {
      eva = 3;
    }
    let params = {
      work_order_id: id,
      evaluate: eva,
      remark: desc,
    };
    let { success } = await evaluate(params);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
    } else {
      Toast.show({
        icon: "fail",
        content: "失败",
      });
    }
    back();
  };
  const back = () => {
    navigate(-1, { replace: true });
  };

  const handleRateChange = (val) => {
    setScore(val);
    console.log(val);
  };
  const handleTextChange = (val) => {
    console.log(val);
    setDesc(val);
  };
  return (
    <div className="evalute-wrap">
      <TitleBar title="评价" />
      <div className="main">
        <Rate
          allowHalf
          defaultValue={2}
          character={<SmileOutline />}
          style={{ marginBottom: "18px" }}
          onChange={handleRateChange}
        />
        <TextArea
          className="my-textarea"
          placeholder="专业能力，服务是否到位？"
          autoSize={{ minRows: 5, maxRows: 10 }}
          onChange={handleTextChange}
        />
        <Button
          color="primary"
          fill="solid"
          style={{ width: "90%" }}
          onClick={handleEvalute}
        >
          确认
        </Button>
      </div>
    </div>
  );
}

export default Evalute;
