import { _post, _get } from "../server/http";

export const armatureAdd = (params) => {
  return _post(`api/accessory_order/add`, params);
};
export const armatureList = (params) => {
  return _post(`api/accessory_order/list`, params);
};
