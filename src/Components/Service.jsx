import React,{useState} from 'react'
import { Button, Container, Col, Row } from "react-bootstrap";
import ServiceList from './ServiceList'
import AddServiceForm from './AddServiceForm'

function Service() {
    const [show, setShow] = useState("none")
    // const [initialState , setInitialState ] = useState({email : '' , description : "" , status : "created" })
    const [data, setData] = useState({email : '' , description : "" , status : "new" })
    return (
        <div>
        <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Service</h2>
            <Button className="float-right" onClick={() => {if(show === "none") setShow("flex"); else setShow("none"); setData({email : '' , description : "" , status : "created" }) }} >{show === "none" ? "New Service request" : "Close"  }</Button>
          </Col>
        </Row>
        <Row style={{display : show }}>
          <Col>
            <AddServiceForm data={data} setData={setData} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ServiceList setShow={setShow} setData={setData} />
          </Col>
        </Row>
      </Container>
        </div>
    )
}

export default Service
