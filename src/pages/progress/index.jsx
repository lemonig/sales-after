import React from "react";
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
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from "antd-mobile-icons";
import headimg from "../../assets/img/head.jpg";
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60";
const { Step } = Steps;

function Progress() {
  return (
    <div className="progress-wrap">
      <TitleBar title="进度查询" />
      <Card className="card-margin">
        <div className="head">
          <Avatar src={headimg} />
          <p>蔡徐坤</p>
          <p>偶像练习生</p>
        </div>
        <div className="content">服务单号: W202205060011026</div>
        <div className="footer">服务工程师:刘杰 》</div>
      </Card>
      <Card className="card-margin">
        <List className="my-list">
          <List.Item prefix={"省份"}>浙江</List.Item>
          <List.Item prefix={"描述"}>浙江</List.Item>

          <List.Item prefix={"照片"}>
            <Space wrap>
              <Image
                src={demoSrc}
                width={64}
                height={64}
                fit="cover"
                style={{ borderRadius: 4 }}
              />
              <Image
                src={demoSrc}
                width={64}
                height={64}
                fit="cover"
                style={{ borderRadius: 8 }}
              />
              <Image
                src={demoSrc}
                width={64}
                height={64}
                fit="cover"
                style={{ borderRadius: 32 }}
              />
            </Space>
          </List.Item>
        </List>
      </Card>
      <Card>
        <Steps current={2}>
          <Step title="受理" icon={<CheckCircleFill />} />
          <Step title="接单" icon={<CheckCircleFill />} />
          <Step title="完工" icon={<CheckCircleFill />} />
          <Step title="评价" icon={<ClockCircleFill />} />
        </Steps>
        <Steps direction="vertical">
          <Step
            title="已评价     2022-06-10 16:12"
            status="finish"
            description="完成时间：2020-12-01 12:30"
          />
          <Step
            title="已完工"
            status="finish"
            description="您的服务已完成，请对我们的服务进行评价"
          />
          <Step title="已接单" status="finish" description="服务工程师：刘杰" />
          <Step
            title="已受理 完成时间：2020-12-01 12:30"
            status="finish"
            description="您的服务需求已被受理，正在给您安排服务工程师"
          />
        </Steps>
      </Card>
    </div>
  );
}

export default Progress;
