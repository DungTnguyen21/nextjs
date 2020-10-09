import React, { useState } from "react";
import { CardBody, Col, Collapse, Row, Table } from "reactstrap";
import Classname from 'classnames'
import Chart from '../RequestChart/RequestChart'
const RequestAccordion = ({data}) => {
  let [open, setOpen] = useState(data.map(item => 0 ));
  let toggle = (i) => {
    let updatedOpen = open.slice();
    updatedOpen[i] = !updatedOpen[i];
    setOpen(updatedOpen);
  };
  let listRender = data.map((item, index) => {
    return (
      <Row>
        <Col md="10" onClick={toggle(index)}>
          <Row>
            <Col md="12">
              <div className="title-content-container">
                <p className="title-content">
                  Time : {new Date(parseInt(item.time)).toLocaleTimeString()}
                </p>
              </div>
              <div className="dropdown-icon">
                <i
                  className={Classname("fas", {
                    "fa-angle-up": !open[index],
                    "fa-angle-down": open[index],
                  })}
                ></i>
              </div>
            </Col>
          </Row>
          <Row>
            <Collapse isOpen={open[index]}>
              <CardBody>
                <Row>
                  <Col><Chart data={data} /></Col>
                  <Col>
                    <Table>
                      <thead>
                        <tr>
                          <th>Status code </th>
                          <th>Ammount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1xx</td>
                          <td>{item.num_1xx}</td>
                        </tr>
                        <tr>
                          <td>2xx</td>
                          <td>{item.num_2xx}</td>
                        </tr>
                        <tr>
                          <td>3xx</td>
                          <td>{item.num_3xx}</td>
                        </tr>
                        <tr>
                          <td>4xx</td>
                          <td>{item.num_4xx}</td>
                        </tr>
                        <tr>
                          <td>5xx</td>
                          <td>{item.num_5xx}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Row>
        </Col>
      </Row>
    );
  });
  return listRender
};
export default RequestAccordion;
