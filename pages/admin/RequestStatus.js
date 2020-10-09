import React, { Component, useEffect, useState } from "react";
import "../../assets/css/Bandwidth.css"
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
  Collapse
} from "reactstrap";
import Axios from "axios";

import Header from "../../components/Headers/Header";
import Chart from '../../components/RequestChart/RequestChart'
import Classname from "classnames"

export default function RequestStatus(){
    let [data,setData]=useState([])
    let [open2, setOpen2] = useState(data.map(item => 0 ));
    let [startDate, setStartDate] = useState(
        new Date(new Date().getTime() - 30 * 86400000)
      );
      let [endDate, setEndDate] = useState(new Date());
  const toggle = (i) => {
    let updatedOpen =open2.slice();
    updatedOpen[i] = !updatedOpen[i];
    setOpen2(updatedOpen)
  };
useEffect(()=>{
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
        type :"request_status"
      },
      headers: {
        authorization: `token ${localStorage.getItem("billing_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setData(res.data.data)
      } else {
      }
    });
  },[startDate,endDate])

 
    let listRender = data.map((item, index) => {
        return <>
          <Row>
            <Col md="10" onClick={()=>toggle(index)}>
              <Row>
                <Col md="12">
                  <div className="title-content-container">
                    <p className="title-content">
                      Time : {new Date(parseInt(item.date)).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="dropdown-icon">
                    <i
                      className= {Classname("fas", {
                        "fa-angle-up": !open2[index],
                        "fa-angle-down": open2[index],
                      })}
                    ></i>
                  </div>
                </Col>
              </Row>
              <Row>
                  <Card>
                  <CardBody>
                <Collapse isOpen={open2[index]}>

                    <Row>
                      <Col md="12">
                      <Chart data={item.daydataarr} />
                      </Col>
                    </Row>
                </Collapse> 
                  </CardBody>
                  </Card>
              </Row>
            </Col>
          </Row>
        </>})
    return <>
        <Header />
        <Container className=" mt--7" fluid>
          <div className="content">
            <Row>
<Col>
          <Card>
      <CardHeader>
        <CardTitle tag="h4">Request status</CardTitle>
      </CardHeader>
      <CardBody>
        {listRender}
      </CardBody>
    </Card>
</Col>
            </Row>
          </div>
        </Container>
      </>
  
}
