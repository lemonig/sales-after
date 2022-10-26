import React from "react";
import { Tabs, NavBar } from "antd-mobile";

import Serve from "./components/Serve";
import TitleBar from "@Components/TitleBar";
import "./index.less";
import { connect } from "react-redux";
import { tabAction } from "@Store/actions/tab-action";
import store from "@Store";
import { useNavigate } from "react-router-dom";
function MyWork({ tab }) {
  let navigate = useNavigate();
  const handleTabChange = (key) => store.dispatch(tabAction.selectTab(key));
  const back = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="my-work">
      <NavBar back="返回" onBack={back}>
        我的服务单
      </NavBar>
      <Tabs onChange={handleTabChange} activeKey={tab.value}>
        <Tabs.Tab title="所有服务" key="1" destroyOnClose>
          <Serve tabKey={1} />
        </Tabs.Tab>
        <Tabs.Tab title="进行中" key="2" destroyOnClose>
          {/* <Process></Process> */}
          <Serve tabKey={2} />
        </Tabs.Tab>
        <Tabs.Tab title="待评价" key="3" destroyOnClose>
          {/* <Evalute></Evalute> */}
          <Serve tabKey={3} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MyWork);
