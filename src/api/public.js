import { _post, _get } from "../server/http";
// file
export const contactList = (file) => {
  return _post(`api/upload/file`, file);
};

export const cityList = () => {
  return _get(`api/faulttype/list`);
};
