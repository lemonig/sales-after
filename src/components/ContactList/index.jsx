import React, { useEffect, useState } from "react";
import {
  Card,
  Toast,
  Button,
  NavBar,
  Space,
  Modal,
  Radio,
  Divider,
} from "antd-mobile";
import "./index.less";
import { useNavigate } from "react-router-dom";
import {
  AddOutline,
  EditSOutline,
  DeleteOutline,
  SmileOutline,
  SmileFill,
} from "antd-mobile-icons";
import { contactList, contactDelete } from "../../api/contact";
import IconFont from "../IconFont";

function Contacts({ selectConcate }) {
  let navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [concated, setConcated] = useState();

  const getPageData = async () => {
    let { data } = await contactList();
    if (data.length) {
      data.map((item, idx) => {
        if (idx == 0) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      setConcated(data[0].id);
      setPageData(data);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  const back = () => {
    navigate(-1, { replace: true });
  };
  const handleDelContact = (id) => {
    Modal.confirm({
      title: "提示",
      content: "确认删除联系人吗",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        let { success } = contactDelete({ id: id });
        if (success) {
          Toast.show({
            icon: "success",
            content: "删除成功",
          });
        }
        getPageData();
      },
      onCancel: () => {
        console.log("Confirmed");
      },
    });
  };
  const handleEditContact = (id) => {
    Modal.confirm({
      content: "离开本页将不保存任何信息，是否离开",
      onConfirm: () => {
        navigate({
          pathname: "/contactEdit",
          search: `?id=${id}`,
        });
      },
    });
  };
  const handleAddContact = () => {
    Modal.confirm({
      content: "离开本页将不保存任何信息，是否离开",
      onConfirm: () => {
        navigate("/contactEdit");
      },
    });
  };

  // 选择
  const handleSelectChange = (val) => {
    pageData.map((ele) => {
      if (ele.id == val) {
        ele.checked = true;
      } else {
        ele.checked = false;
      }
    });
    setConcated(val);
  };
  // 确认
  const handleSelectConfirm = () => {
    let res = pageData.filter((item) => {
      return item.id === concated;
    });
    if (res.length) {
      selectConcate(res[0]);
    } else {
      selectConcate("");
    }
  };

  const $concat = () => {
    return pageData.map((item) => (
      <div className="list-item" key={item.id}>
        <Radio
          className="my-radio"
          value={item.id}
          icon={(checked) =>
            item.checked ? (
              <IconFont
                iconName="xuanze3"
                style={{ color: "var(--adm-color-primary)" }}
              />
            ) : (
              <IconFont
                iconName="xuanze1"
                style={{ color: "var(--adm-color-weak)" }}
              />
            )
          }
        ></Radio>
        <Card style={{ borderRadius: "6px" }}>
          <div
            className="content"
            onClick={() => {
              handleSelectChange(item.id);
            }}
          >
            <p>
              {item.name} {item.company_name}
            </p>
            <p>{item.mobile}</p>
            <p>{item.detailed_address}</p>
          </div>
          <div className="footer" onClick={(e) => e.stopPropagation()}>
            <span onClick={() => handleDelContact(item.id)}>
              <DeleteOutline color="var(--adm-color-primary)" />
              删除
            </span>
            <span onClick={() => handleEditContact(item.id)}>
              <EditSOutline color="var(--admhandleAddConcate-color-primary)" />
              编辑
            </span>
          </div>
        </Card>
      </div>
    ));
  };

  return (
    <div className="contacts-wrap">
      <div className="btn-top">
        <Button onClick={handleAddContact}>
          <Space>
            <AddOutline />
            <span>添加联系人</span>
          </Space>
        </Button>
      </div>
      <div className="contact-list">
        <Radio.Group
          concated={concated}
          onChange={(val) => {
            handleSelectChange(val);
          }}
        >
          {$concat()}
        </Radio.Group>
      </div>
      <Divider></Divider>
      <div className="btn-bottom">
        <Button
          color="primary"
          fill="solid"
          style={{ width: "90%" }}
          onClick={handleSelectConfirm}
        >
          确认
        </Button>
      </div>
    </div>
  );
}

export default Contacts;
