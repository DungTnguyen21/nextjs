import Axios from "axios";
import https from "https";
import jwt from "jsonwebtoken";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const agent = new https.Agent({
  rejectUnauthorized: false,
});
export default async (req, res) => {
  if (req.method === "POST") {
    let { username, password } = req.body;
    let response = await Axios({
      method: "POST",
      url: process.env.LOGIN_API_URL,
      data: {
        username,
        password,
      }
    });
    if (response.status === 200) {
      let { data } = response;
      let token = jwt.sign(
        {
          username: data.username,
          biz_id: data.bizid,
          user_id: data.id,
        },
        process.env.SECRET_KEY
      );
      res.json({
        token,
        data,
      });

      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else res.statusCode = 404;
};
