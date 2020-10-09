import { sign } from "jsonwebtoken";
import Axios from "axios";

export const getBandwith = (date_begin, date_end, biz_id, user_id) => {
  let res = Axios({
    method: "POST",
    url: "https://filestore-billing-api-dev.vngcloud.vn/api/bandwidth",
    data: {
      biz_id,
      date_begin,
      date_end,
      user_id,
    },
    headers: {
      "Content-Type": "application/json",
      token: `${sign({ app_name: "frontend",time :new Date().getTime() }, process.env.API_SECRET_KEY)}`,
    },
  });
  return res;
};
export const getStorageOverall = async (biz_id, user_id) => {
  return await Axios({
    method: "POST",
    url: "https://filestore-billing-api-dev.vngcloud.vn/api/quotaoverall",
    data: {
      biz_id,
      user_id,
    },
    headers: {
      "Content-Type": "application/json",
      token: `${sign({ app_name: "frontend",time :new Date().getTime() }, process.env.API_SECRET_KEY)}`,
    },
  });
};
export const getStorageDetail = async (biz_id, user_id) => {
  return await Axios({
    method: "POST",
    url: "https://filestore-billing-api-dev.vngcloud.vn/api/quotadetail",
    data: {
      biz_id,
      user_id,
     
    },
    headers: {
      "Content-Type": "application/json",
      token: `${sign({ app_name: "frontend" ,time :new Date().getTime()}, process.env.API_SECRET_KEY)}`,
    },
  });
};
