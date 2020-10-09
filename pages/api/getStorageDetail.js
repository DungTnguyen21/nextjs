import client from "../../libs/Redis/Redis";
import jwt, { decode, verify } from "jsonwebtoken";
import Axios from "axios";
import { getStorageDetail } from "../../libs/API/fetchData";
export default async (req, res) => {
  // console.log(req.headers);
  if (req.method === "POST") {
    const { authorization } = req.headers;
    if (verify(authorization.split(" ")[1], process.env.SECRET_KEY)) {
      //console.log(decode(authorization));
      let { biz_id, user_id } = decode(authorization.split(" ")[1]);
      let response = getStorageDetail(biz_id, user_id);
      if ((await response).status === 404) {
        res.statusCode = 404;
        res.end();
      } else {
        res.json((await response).data);
        res.end();
      }
    }
  }
};
