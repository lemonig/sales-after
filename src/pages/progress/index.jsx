import React, { useEffect, useState } from "react";
import {
  Card,
  Toast,
  Button,
  NavBar,
  Steps,
  Avatar,
  List,
  Space,
  Image,
  ImageViewer,
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from "antd-mobile-icons";
import headimg from "../../assets/img/head.jpg";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { workOrderDetail } from "../../api/workorder";
import Item from "antd-mobile/es/components/dropdown/item";
import { orderStatus } from "../../utils/constant";
import moment from "moment";
import IconFont from "../../components/IconFont";

const { Step } = Steps;

const orderStatusList = [
  {
    txt: "已受理",
    num: 2,
  },
  {
    txt: "已接单",
    num: 3 || 4,
  },
  {
    txt: "完工",
    num: 5,
  },
  {
    txt: "评价",
    num: 6,
  },
];
function Progress() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [imgVisible, setImgVisible] = useState(false);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    getPageData();
  }, []);
  const getPageData = async () => {
    let { data } = await workOrderDetail({ id: id });
    data.log = data.log.reverse();
    setPageData(data);
  };

  const $step = () => {
    return pageData?.log?.map((item, index) => {
      let { stage } = item;
      let desc = "";
      if (stage === 2) {
        desc = "您的服务需求已被受理，正在给您安排服务工程师";
      } else if (stage === 3) {
        desc = "服务工程师：" + item.user_name;
      } else if (stage === 4) {
        desc = "服务工程师：" + item.user_name;
      } else if (stage === 5) {
        desc = "您的服务已完成，请对我们的服务进行评价";
      } else if (stage === 6) {
        desc = "";
      }
      return (
        <Step
          key={index}
          title={`${orderStatus(item.stage)}   ${moment(item.gmt_create).format(
            "YYYY-MM-DD HH:mm"
          )}`}
          status="finish"
          description={item.describe}
        />
      );
    });
  };
  const previewImg = () => {
    if (!pageData.wechat_url) {
      Toast.show({
        content: "二维码未上传",
        afterClose: () => {},
      });
      return;
    }
    setImgVisible(true);
  };
  //获取自定义step 状态
  const getStepStatus = (step, nowStep) => {
    // 3\4同状态
    if (nowStep == 2) {
      nowStep += 1;
    }
    if (step <= nowStep) {
      return "finish";
    } else {
      if (step == nowStep + 1) {
        return "process";
      } else {
        return "wait";
      }
    }
  };

  return (
    <div className="progress-wrap">
      <TitleBar title="进度查询" />
      <Card className="card-margin">
        <div className="head">
          <Avatar src={pageData.wechat_url} />
          <p>{pageData.workOrder?.submitter}</p>
          <p>{pageData.workOrder?.submitter_company}</p>
        </div>
        <div className="content">
          服务单号: {pageData.workOrder?.service_code}
        </div>
        <div className="footer">
          {pageData?.service_engineer ? (
            <>
              服务工程师:
              {pageData.service_engineer}
              <span onClick={previewImg}>
                <IconFont size="16" iconName="erweima1" />
              </span>
            </>
          ) : null}
        </div>
      </Card>
      <Card className="card-margin">
        <List className="my-list">
          <List.Item prefix={"省份"}>{pageData.workOrder?.cityName}</List.Item>
          <List.Item prefix={"描述"}>{pageData.workOrder?.describe}</List.Item>

          <List.Item prefix={"照片"}>
            <Space wrap>
              {pageData.workOrder?.photo?.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={64}
                  height={64}
                  fit="cover"
                  style={{ borderRadius: 4 }}
                />
              ))}
            </Space>
          </List.Item>
        </List>
      </Card>
      <Card>
        <Steps>
          <Step
            title="受理"
            status={getStepStatus(2, pageData.workOrder?.status)}
            icon={
              2 <= pageData.workOrder?.status ? (
                <CheckCircleFill color="#DF9325" />
              ) : (
                <ClockCircleFill />
              )
            }
          />
          <Step
            title="接单"
            status={getStepStatus(4, pageData.workOrder?.status)}
            icon={
              4 <= pageData.workOrder?.status ? (
                <CheckCircleFill color="#DF9325" />
              ) : (
                <ClockCircleFill />
              )
            }
          />
          <Step
            title="完工"
            status={getStepStatus(5, pageData.workOrder?.status)}
            icon={
              5 <= pageData.workOrder?.status ? (
                <CheckCircleFill color="#DF9325" />
              ) : (
                <ClockCircleFill />
              )
            }
          />
          <Step
            title="评价"
            status={getStepStatus(6, pageData.workOrder?.status)}
            icon={
              6 <= pageData.workOrder?.status ? (
                <CheckCircleFill color="#DF9325" />
              ) : (
                <ClockCircleFill />
              )
            }
          />

          {/* {orderStatusList?.map((item, index) => {
            return (
              <Step
                title={item.txt}
                key={item.num}
             
                icon={
                  item.num <= pageData.workOrder?.status ? (
                    <CheckCircleFill />
                  ) : (
                    <ClockCircleFill />
                  )
                }
              />
            );
          })} */}
        </Steps>
        <Steps direction="vertical">{$step()}</Steps>
      </Card>
      <ImageViewer
        image={pageData.wechat_url}
        visible={imgVisible}
        onClose={() => {
          setImgVisible(false);
        }}
      />
    </div>
  );
}

export default Progress;
