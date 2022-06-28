import { _post, _get } from "../server/http";

export const workOrderList = (params) => {
  return _post(`api/WorkOrder/list`, params);
};
export const workOrderAdd = (params) => {
  return _post(`/api/WorkOrder/add`, params);
};
export const workOrderDetail = (params) => {
  return _post(`/api/WorkOrder/detail`, params);
};
// 工单类型
export const faulttypeList = () => {
  return _get(`api/faulttype/list`);
};
// export const contactEdit = (params) => {
//   return _post(`/api/LinkMan/update`, params);
// };
// export const contactDelete = (params) => {
//   return _post(`/api/LinkMan/delete`, params);
// };
