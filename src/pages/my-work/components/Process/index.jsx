import React, { useEffect, useState } from "react";
import ListCard from "../ListCard";
import "./index.less";
import { workOrderList } from "../../../../api/workorder";
import { Empty } from "antd-mobile";

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
    let newData = data.filter((item) => {
      return item.status !== 5 && item.status !== 6;
    });
    setPageData(newData);
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
