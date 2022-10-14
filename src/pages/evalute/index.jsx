import React, { useEffect, useState } from "react";
import { Rate, Space, Toast, TextArea, Button, Grid } from "antd-mobile";
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
import IconFont from "../../components/IconFont";

const menuList = [
  {
    icon: "chaping",
    name: "差评",
    val: 1,
  },
  {
    icon: "zhongping",
    name: "中评",
    val: 2,
  },
  {
    icon: "haoping",
    name: "好评",
    val: 3,
  },
];

function Evalute() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [pageData, setPageData] = useState([]);
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(3);
  const [isSolve, setIsSolve] = useState(1);

  useEffect(() => {}, []);
  const handleEvalute = async () => {
    let params = {
      work_order_id: id,
      evaluate: score,
      remark: desc,
      solved: isSolve,
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
    // console.log(val);
  };
  const handleTextChange = (val) => {
    // console.log(val);
    setDesc(val);
  };
  const handleScore = (val) => {
    setScore(val);
  };

  return (
    <div className="evalute-wrap">
      <TitleBar title="评价" />
      <div className="main">
        {/* <Rate
          allowHalf
          defaultValue={2}
          character={<SmileOutline />}
          style={{ marginBottom: "18px" }}
          onChange={handleRateChange}
        /> */}
        <div className="evalute">
          <Grid columns={3} gap={8}>
            {menuList.map((item, index) => (
              <Grid.Item key={index} onClick={() => handleScore(item.val)}>
                <div
                  className={`menu-item ${item.val == score ? "active" : ""}`}
                >
                  <p>{item.name}</p>

                  <IconFont iconName={item.icon} size="16" />
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </div>
        <div className="quest">
          <p>问题是否解决</p>
          <div>
            <Button
              onClick={() => {
                setIsSolve(1);
              }}
              fill="outline"
              // color="primary"
              className={isSolve == 1 ? "my-button" : ""}
            >
              已解决
            </Button>
            <Button
              // color="primary"
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
        >
          确认
        </Button>
      </div>
    </div>
  );
}

export default Evalute;
