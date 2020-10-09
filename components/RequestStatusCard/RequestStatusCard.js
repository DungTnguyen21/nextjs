import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from "reactstrap";
import Accordion from "../Accordion/RequestAccordion";
const RequestStatusCard = ({ data}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Request status</CardTitle>
      </CardHeader>
      <CardBody>
        <Accordion data={data} />
      </CardBody>
    </Card>
  );
};
export default RequestStatusCard;
