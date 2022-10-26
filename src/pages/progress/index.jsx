import React, { useEffect, useState, useRef } from "react";
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
  Modal,
} from "antd-mobile";
import "./index.less";
import { CheckCircleFill, ClockCircleFill } from "antd-mobile-icons";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { workOrderDetail } from "../../api/workorder";
import { orderStatus } from "../../utils/constant";
import moment from "moment";
import IconFont from "../../components/IconFont";

const { Step } = Steps;

function Progress() {
  let navigate = useNavigate();
  const { id } = useParams();
  const imageViewerRef = useRef(null);
  console.log(id);
  // let id = new URLSearchParams(useLocation().search).get("id");
  const [imgMVisible, setImgMVisible] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [workOrder, setWorkOrder] = useState({});

  useEffect(() => {
    getPageData(id);
  }, [id]);
  const getPageData = async (id) => {
    let { data } = await workOrderDetail({ id });
    data.log = data.log.reverse();
    setPageData(data);
    setWorkOrder(data.workOrder);
  };

  const $step = () => {
    return pageData?.log?.map((item, index) => (
      <Step
        key={index}
        title={`${orderStatus(item.stage)}   ${moment(item.gmt_create).format(
          "YYYY-MM-DD HH:mm"
        )}`}
        status={index == 0 ? "process" : "wait"}
        description={item.describe}
      />
    ));
  };
  const previewImg = () => {
    if (!pageData.wechat_url) {
      Toast.show({
        content: "二维码未上传",
        afterClose: () => {},
      });
      return;
    }
    Modal.show({
      content: (
        <div>
          <Image src={pageData.wechat_url} fit="contain" />
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            长按二维码添加服务工程师企业微信
          </p>
        </div>
      ),
      closeOnMaskClick: true,
    });
  };
  //获取自定义step 状态 2:已受理 ,3：已接单 4:转派 5:完工, 6：已评价
  const getStepStatus = (step, nowStep) => {
    // 3\4同状态
    if (nowStep == 2 || nowStep == 3) {
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
  const back = () => {
    navigate("/mywork", { replace: true });
  };
  return pageData ? (
    <div className="progress-wrap">
      <NavBar back="返回" onBack={back}>
        进度查询
      </NavBar>
      {/* <TitleBar title="进度查询" /> */}
      <Card className="card-margin">
        <List className="my-list no-border">
          <List.Item prefix={<Avatar src={workOrder?.head_url} />}>
            <p>{workOrder?.submitter}</p>
            <p>{workOrder?.submitter_company}</p>
          </List.Item>
          <List.Item prefix={"服务单号"}>{workOrder?.service_code}</List.Item>
          {pageData.service_engineer ? (
            <List.Item prefix={"服务工程师"} onClick={previewImg} arrow={null}>
              {pageData.service_engineer}
              <span>
                <IconFont
                  size="16"
                  iconName="erweima1"
                  style={{ margin: "0 6px" }}
                />
              </span>
            </List.Item>
          ) : null}
        </List>
      </Card>
      <Card className="card-margin">
        <List className="my-list">
          <List.Item prefix={"省份"}>
            {workOrder?.cityName ? workOrder.cityName : "--"}
          </List.Item>
          <List.Item prefix={"描述"}>
            {workOrder?.describe ? workOrder.describe : "--"}
          </List.Item>
          <List.Item prefix={"产品型号"}>
            {workOrder?.model ? workOrder.model : "--"}
          </List.Item>

          <List.Item prefix={"照片"}>
            {workOrder?.photo.length > 0 ? (
              <Space wrap>
                {workOrder?.photo?.map((item, index) => (
                  <Image
                    key={index}
                    src={item}
                    width={64}
                    height={64}
                    fit="cover"
                    style={{ borderRadius: 4 }}
                    onClick={() => {
                      setImgMVisible(true);
                      imageViewerRef.current.swipeTo(index, true);
                    }}
                  />
                ))}
              </Space>
            ) : (
              "--"
            )}
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
              3 <= pageData.workOrder?.status ? (
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

      <ImageViewer.Multi
        ref={imageViewerRef}
        images={pageData.workOrder?.photo}
        visible={imgMVisible}
        onClose={() => {
          setImgMVisible(false);
        }}
      />
    </div>
  ) : null;
}

export default Progress;
