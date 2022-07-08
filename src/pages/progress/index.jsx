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

const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60";
const { Step } = Steps;

const orderStatusList = ["待受理", "受理", "转派", "接单", "完工", "评价"];
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
      let desc = "";
      if (index == 0) {
        desc = "";
      } else if (index == 1) {
        desc = "您的服务已完成，请对我们的服务进行评价";
      } else if (index == 2) {
        desc = "";
      } else if (index == 3) {
        desc = "服务工程师：" + item.user_name;
      } else if (index == 4) {
        desc = "您的服务需求已被受理，正在给您安排服务工程师";
      } else if (index == 5) {
        desc = "";
      }
      return (
        <Step
          key={index}
          title={`${orderStatus(item.stage)}   ${moment(item.gmt_create).format(
            "YYYY-MM-DD HH:mm"
          )}`}
          status="finish"
          description={desc}
        />
      );
    });
  };
  const previewImg = () => {
    console.log(!!pageData.wechat_url);
    if (!pageData.wechat_url) {
      Toast.show({
        content: "二维码未上传",
        afterClose: () => {},
      });
      return;
    }
    setImgVisible(true);
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
          服务工程师:{pageData?.service_engineer}
          <span onClick={previewImg}>
            <IconFont size="16" iconName="erweima1" />
          </span>
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
        <Steps current={pageData.workOrder?.status}>
          {orderStatusList?.map((item, index) => {
            return (
              <Step
                title={item}
                key={index}
                icon={
                  index < pageData.workOrder?.status ? (
                    <CheckCircleFill />
                  ) : (
                    <ClockCircleFill />
                  )
                }
              />
            );
          })}
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
