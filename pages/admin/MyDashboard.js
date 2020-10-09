import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  CardTitle,
  Row,
  CardImg,
  Col,
  CardSubtitle,
  Container,
} from "reactstrap";
import "../../assets/css/Dashboard.css";
import Axios from "axios";
import BandWidthChart from "../../components/SummaryChart/SummaryChart";
import StoragePieChart from "../../components/StoragePieChart/StoragePieChart";
// import { useAppContext } from "../libs/contextLib";
import PerfectScrollbar from "perfect-scrollbar";
import Header from "components/Headers/Header.js";
var ps;
const MyDashboard = (props) => {
  //let [time,setTime] = useState(new Date())
  let [storage, setStorage] = useState({});
  let [bandwidth, setBandwidth] = useState([]);
  // let { userHasAuthenticated } = useAppContext();
  useEffect(() => {
    let tables = document.querySelectorAll(".table-responsive");
    for (let i = 0; i < tables.length; i++) {
      // console.log(tables[i]);
      ps = new PerfectScrollbar(tables[i]);
    }
  });
  useEffect(() => {
    let present = new Date();
    present.setHours(0, 0, 0, 0);
    console.log(present.getTime());
    let pass = new Date(present.getTime() - 86400000 * 7);

    Axios({
      method: "POST",
      url: "http://localhost:3000/api/getBandwidth",
      data: {
        date_begin: pass.getTime(),
        date_end: present.getTime(),
        type: "bandwidth",
      },
      headers: {
        "Content-Type": "application/json",
        authorization: `token ${window.localStorage.getItem("billing_token")}`,
      },
    }).then((res) => {
      //console.log(res.data);
      setBandwidth(res.data.data);
    });
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/getStorageOverall",
      data: {},
      headers: {
        authorization: `token ${localStorage.getItem("billing_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res.data)
      setStorage(res.data);
    });
  },[]);
  const calcForTable = (uploadOrDownload, minOrMax) => {
    let arr;
    if (minOrMax === "min") {
      arr = Math.min(
        ...bandwidth.map((item) =>
          Math.min(
            ...item.data
              .filter((val) => val._type === uploadOrDownload)
              .map((value) => parseInt(value.size))
          )
        )
      );
      console.log(arr);
    } else if (minOrMax === "max")
      arr = Math.max(
        ...bandwidth.map((item) =>
          Math.max(
            ...item.data
              .filter((val) => val._type === uploadOrDownload)
              .map((value) => value.size)
          )
        )
      );
    return arr;
  };
  const calcSum = (_type) => {
    let sum = 0;
    bandwidth.forEach((val) => {
      let partSum = val.data
        .filter((item) => parseInt(item._type) === _type)
        .map((item) => parseInt(item.size))
        .reduce((a, b) => a + b, 0);
      sum += partSum;
    });
    return sum.toFixed(2);
  };
  return (
    <>
      <Header />
      <Container className="mt--7">
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col md="1">
                      <CardImg
                        className="user-avatar"
                        src={require("../../assets/img/anime3.png")}
                      />
                    </Col>
                    <Col md="3">
                      <CardTitle>User name</CardTitle>
                      <CardSubtitle>User ID : 1234567</CardSubtitle>
                    </Col>

                    <Col md="3">
                      <CardTitle>Date</CardTitle>
                      <CardSubtitle>
                        {new Date().toLocaleDateString()}
                      </CardSubtitle>
                    </Col>
                    <Col>
                      <CardTitle>Role</CardTitle>
                      <CardSubtitle>Admin</CardSubtitle>
                    </Col>
                    <Col>
                      <CardTitle>Total Storage</CardTitle>
                      <CardSubtitle>{storage.quota} GB</CardSubtitle>
                    </Col>
                  </Row>
                </CardBody>
                {/* </CardBody> */}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle>Storage</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <div className="pie-chart-container">
                        <div className="d-flex">
                          <StoragePieChart
                            data={{ quota: parseInt(storage.quota) }}
                            free={
                              parseInt(storage.quota) - parseInt(storage.used)
                            }
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table className="tablesorter" responsive>
                        <thead>
                          <tr>
                            <th>Total</th>
                            <th>Used</th>
                            <th>Free</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {parseInt(storage.used) + parseInt(storage.free)}
                            </td>
                            <td>{storage.used}</td>
                            <td>{parseInt(storage.free)}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle>Bandwidth</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="8">
                      {<BandWidthChart data={bandwidth} />}
                    </Col>
                    <Col md="4">
                      <Row>
                        <Col>
                          <CardTitle>Download</CardTitle>
                          <CardSubtitle>{calcSum(0)}</CardSubtitle>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <CardTitle>Upload</CardTitle>
                          <CardSubtitle>{calcSum(1)}</CardSubtitle>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary ">
                          <tr>
                            <th>Min Upload</th>
                            <th>Max Upload</th>
                            <th>Min Download</th>
                            <th>Max Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{calcForTable("1", "min")}</td>
                            <td>{calcForTable("1", "max")}</td>
                            <td>{calcForTable("0", "min")}</td>
                            <td>{calcForTable("0", "max")}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default MyDashboard;
