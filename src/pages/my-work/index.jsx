import React from "react";
import { Tabs, NavBar } from "antd-mobile";

import Serve from "./components/Serve";
import Evalute from "./components/Evalute";
import Process from "./components/Process";
import TitleBar from "@Components/TitleBar";

function MyWork() {
  return (
    <div className="my-work">
      <TitleBar title="我的服务单" />
      <Tabs>
        <Tabs.Tab title="所有服务" key="fruits">
          <Serve />
        </Tabs.Tab>
        <Tabs.Tab title="进行中" key="vegetables">
          <Process></Process>
        </Tabs.Tab>
        <Tabs.Tab title="待评价" key="animals">
          <Evalute></Evalute>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default MyWork;
