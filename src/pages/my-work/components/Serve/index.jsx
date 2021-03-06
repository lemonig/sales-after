import React, { useEffect, useState } from "react";
import ListCard from "../ListCard";
import "./index.less";
import { workOrderList } from "../../../../api/workorder";
import { Empty } from "antd-mobile";

const Pagedata = [
  {
    tag: "信息咨询",
    time: "2022-05-04",
    description: "前方战事告急",
    porcess: 0,
  },
  {
    tag: "业务废弃",
    time: "2024-15-04",
    description: "后方战事告急",
    porcess: 1,
  },
];

function Serve() {
  const [pageData, setPageData] = useState([]);
  const [pageMsg, setPagemsg] = useState({
    start_page: 1,
    limit: 10000,
  });
  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    let { data } = await workOrderList(pageMsg);
    setPageData(data);
  };
  return (
    <div>
      {pageData.length ? (
        pageData.map((item, index) => (
          <div className="card-item" key={index}>
            <ListCard msg={item}></ListCard>
          </div>
        ))
      ) : (
        <Empty description="暂无数据" />
      )}
    </div>
  );
}

export default Serve;
