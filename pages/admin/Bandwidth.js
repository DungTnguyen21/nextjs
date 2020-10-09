import React, { useEffect, useState } from "react";
import "../../assets/css/Bandwidth.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Container,
  Collapse,
} from "reactstrap";
import Axios from "axios";
import SummaryChart from "../../components/SummaryChart/SummaryChart";
import PerfectScrollbar from "perfect-scrollbar";
import Accordion from "../../components/Accordion/Accordion";
import Header from "../../components/Headers/Header";
import RequestStatusCard from "../../components/RequestStatusCard/RequestStatusCard";
import Classname from "classnames";
import Chart from '../../components/RequestChart/RequestChart'
var ps;
const Bandwidth = (props) => {
  let [request, setRequest] = useState([[]]);
  let [bandwidthData, setSampleData] = useState([]);
  let [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 30 * 86400000)
  );
  let [endDate, setEndDate] = useState(new Date());
  let [open2, setOpen2] = useState(request.map((item) => 0));
  // let [requestData, setRequestData] = useState([]);
  let [open, setOpen] = useState(
    bandwidthData.map((item) => {
      return 0;
    })
  );
  const toggle2 = (i) => {
    let updatedOpen = open2.slice();
    updatedOpen[i] = !updatedOpen[i];
    setOpen2(updatedOpen);
  };
  let toggle = (index) => {
    let newOpen = open.slice();
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  useEffect(() => {
    // console.log("updated")
    let start = Object.assign(startDate);
    start.setHours(0, 0, 0, 0);
    let end = Object.assign(endDate);
    end.setHours(0, 0, 0, 0);
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/getBandwidth",
      data: {
        date_begin: start.getTime(),
        date_end: end.getTime(),
        type: "bandwidth",
      },
      headers: {
        authorization: `token ${localStorage.getItem("billing_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        setSampleData(res.data.data);
      } else {
      }
    });
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/getBandwidth",
      data: {
        date_begin: start.getTime(),
        date_end: end.getTime(),
        type :"request_status"
      },
      headers: {
        authorization: `token ${localStorage.getItem("billing_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        setRequest(res.data.data)
      } else {
      }
    });
    // setRequestData(res.data.request_status)
  }, [startDate, endDate]);
  
  useEffect(() => {
    let tables = document.querySelectorAll(".table-responsive");
    for (let i = 0; i < tables.length; i++) {
      ps = new PerfectScrollbar(tables[i]);
    }
  });
 
  let listCollapse = bandwidthData.map((item, index) => {
    return (
      <Accordion
        Date={new Date(parseInt(item.date))}
        onClick={() => toggle(index)}
        isOpen={open[index]}
        data={item.data}
        key={index}
      />
    );
  });
  let listRender = request.map((item, index) => {
    return (
      <>
        <Row>
          <Col md="10" onClick={() => toggle2(index)}>
            <Row>
              <Col md="12">
                <div className="title-content-container">
                  <p className="title-content">
                    Time : {new Date(parseInt(item.date)).toLocaleDateString()}
                  </p>
                </div>
                <div className="dropdown-icon">
                  <i
                    className={Classname("fas", {
                      "fa-angle-up": !open2[index],
                      "fa-angle-down": open2[index],
                    })}
                  ></i>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <Card>
                <CardBody>
                  <Collapse isOpen={open2[index]}>
                  <Row>
                    <Col>
                    <Row>
                      <Col md="12">
                        <Chart data={item.daydataarr} />
                      </Col>
                    </Row>
                    </Col>
                  </Row>
                  </Collapse>
                </CardBody>
              </Card>
               </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  });
  const handleChangeStartDate = (event) => {
    setStartDate(new Date(event.target.value));
  };
  const handleChangeEndDate = async (event) => {
    setEndDate(new Date(event.target.value));
  };
  const calcTotal = (data, type) => {
    let sum = 0;

    //console.log(data)
    data.forEach((item) => {
      item.data.forEach((value) => {
        if (parseInt(value._type) === type) sum += parseInt(value.size);
      });
    });
    return sum;
  };
  const logout = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    let start = Object.assign(startDate);
    start.setHours(0, 0, 0, 0);
    let end = Object.assign(endDate);
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/getBandwidth",

      data: {
        date_begin: start.getTime(),
        date_end: end.getTime(),
        type: "bandwidth",
      },
      headers: {
        authorization: `token ${localStorage.getItem("billing_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setSampleData(res.data.data);
        console.log(res);
      } else {
        logout();
      }
    });
  };

  return (
    <>
      <Header />
      <Container className=" mt--7" fluid>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Overview</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12" className="query">
                      <Form inline onSubmit={(event) => handleSubmit(event)}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label className="mr-sm-2">From</Label>
                          <Input
                            type="date"
                            value={startDate.toISOString().substr(0, 10)}
                            onChange={(event) => handleChangeStartDate(event)}
                          />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label className="mr-sm-2">to</Label>
                          <Input
                            type="date"
                            value={endDate.toISOString().substr(0, 10)}
                            onChange={(event) => handleChangeEndDate(event)}
                          />
                        </FormGroup>
                        <FormGroup className="mr-sm-2 view-button">
                          <Input type="submit" value="View" />
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>

                  {bandwidthData.length ? (
                    <>
                      <Row>
                        <Col md="10" className="summary-table-col">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th>Upload</th>
                                <th>Download</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{calcTotal(bandwidthData, 1)} </td>
                                <td>{calcTotal(bandwidthData, 0)}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="10" className="summary-chart-col">
                          <SummaryChart data={bandwidthData} />
                        </Col>
                      </Row>
                    </>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {/* <RequestStatusCard startDate={startDate} endDate={endDate} /> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Request status</CardTitle>
                </CardHeader>
                <CardBody>{listRender}</CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Detail</CardTitle>
                </CardHeader>
                <CardBody>{listCollapse}</CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default Bandwidth;
