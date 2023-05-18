import React, { useEffect, useState } from "react";
import { Rate, Toast, TextArea, Button, NavBar } from "antd-mobile";
import "./index.less";
import { evaluate, hasEvaluated as hasEvaluatedApi } from "../../api/evalute";
import { useNavigate, useLocation } from "react-router-dom";

function Evalute() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [pageData, setPageData] = useState([]);
  const [desc, setDesc] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isSolve, setIsSolve] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasEvaluted = async () => {
      let { success, data } = await hasEvaluatedApi(id);

      if (
        data &&
        "processing_efficiency" in data &&
        "service_attitude" in data
      ) {
        navigate({
          pathname: `/mywork`,
          replace: true,
        });
      }
    };
    hasEvaluted();
  }, []);

  const handleEvalute = async () => {
    if (!score1 || !score2) {
      Toast.show({
        content: "请对我们的服务做出评价，谢谢！",
        position: "top",
      });
      return;
    }
    setLoading(true);
    let params = {
      work_order_id: id,
      processing_efficiency: score1,
      service_attitude: score2,
      remark: desc,
      solved: isSolve,
    };
    let { success } = await evaluate(params);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      back();
    } else {
      Toast.show({
        icon: "fail",
        content: "失败",
      });
      setLoading(false);
    }
  };
  const back = () => {
    navigate({
      pathname: `/mywork`,
      replace: true,
    });
  };

  const handleRateChange1 = (val) => {
    setScore1(val);
  };

  const handleRateChange2 = (val) => {
    setScore2(val);
  };
  const handleTextChange = (val) => {
    setDesc(val);
  };

  return (
    <div className="evalute-wrap">
      <NavBar back="返回" onBack={back}>
        评价
      </NavBar>
      <div className="main">
        <div className="evalute">
          <p>您对工程师的服务满意吗</p>
          <div>
            <span>处理效率</span>
            <Rate
              allowHalf={false}
              defaultValue={0}
              onChange={handleRateChange1}
              value={score1}
            />
          </div>
          <div>
            <span>服务态度</span>
            <Rate
              allowHalf={false}
              defaultValue={0}
              onChange={handleRateChange2}
              value={score2}
            />
          </div>
        </div>
        <div className="quest">
          <p>问题是否解决</p>
          <div>
            <Button
              onClick={() => {
                setIsSolve(1);
              }}
              fill="outline"
              className={isSolve == 1 ? "my-button" : ""}
            >
              已解决
            </Button>
            <Button
              fill="outline"
              onClick={() => {
                setIsSolve(2);
              }}
              className={isSolve == 2 ? "my-button" : ""}
            >
              未解决
            </Button>
          </div>
        </div>
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
          loading={loading}
        >
          确认
        </Button>
      </div>
    </div>
  );
}

export default Evalute;
