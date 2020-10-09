import React from "react";
import { Row, Col, Collapse, Table, CardBody } from "reactstrap";
import Classname from "classnames";
import StorageChart from "../StoragePieChart/StoragePieChart";

const StorageAccordion = (props) => {
  const calcFreeStorage = (total, detail) => {
    let sum = 0;
    console.log(detail);
    for (let item in detail) {
      sum += parseInt(detail[item].size);
    }
    return total - sum;
  };
  return (
    <>
      <Row>
        <Col md="10" className="item-table-container">
          <Row className="item-title-row" onClick={props.onClick}>
            <Col md="12">
              <div className="title-content-container">
                <p className="title-content">
                  Partiton: {props.data.storage}
                </p>
              </div>
              <div className="dropdown-icon">
                <i
                  className={Classname("fas", {
                    "fa-angle-up": !props.isOpen,
                    "fa-angle-down": props.isOpen,
                  })}
                ></i>
              </div>
            </Col>
          </Row>
          <Collapse isOpen={props.isOpen}>
            <CardBody>
              <Row className="item-table">
                <Col md="6">
                  <StorageChart
                    data={props.data}
                    free={calcFreeStorage(
                      parseInt(props.data.total),
                      props.data.detail
                    )}
                  />
                </Col>
                <Col md="6">
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>File type</th>
                        <th>Ammount</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.detail.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.filetype.replace('|','/')}</td>
                            <td>{item.num_of_file}</td>
                            <td>{item.size}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>Free</td>
                        <td>
                          {calcFreeStorage(
                            parseInt(props.data.total),
                            props.data.detail
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};
export default StorageAccordion;
