import React from "react";
import ListCard from "../ListCard";
import "./index.less";
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
  return (
    <div>
      {Pagedata.map((item, index) => (
        <div className="card-item" key={index}>
          <ListCard msg={item}></ListCard>
        </div>
      ))}
    </div>
  );
}

export default Serve;
