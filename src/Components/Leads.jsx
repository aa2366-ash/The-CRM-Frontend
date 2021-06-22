import React, { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import AddLeadsForm from "./AddLeadsForm";
import LeadList from "./LeadList";

function Leads() {
  const [show, setShow] = useState("none");
  const [data, setData] = useState({email : '' , description : "" , status : "new" })
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Leads</h2>
  <Button className="float-right" onClick={() => {if(show === "none") setShow("flex"); else setShow("none"); setData({email : '' , description : "" , status : "new" }) }} >{show === "none" ? "New lead" : "Close"  }</Button>
          </Col>
        </Row>
        <Row style={{display : show }}>
          <Col>
            <AddLeadsForm data={data} setData={setData} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LeadList setData={setData} setShow={setShow} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leads;
