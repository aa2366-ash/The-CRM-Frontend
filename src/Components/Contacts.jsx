import React , {useState} from 'react'
import {Button, Container, Col, Row} from 'react-bootstrap'
import AddContactsForm from './AddContactsForm'
import ContatsList from './ContatsList'


function Contacts() {

    const [show, setShow] = useState("none")
    return (
        <div>
            
        <Container fluid> 
            <Row> 
                <Col>
                    <h2 className="float-left">Contacts</h2>
                    <Button className="float-right" onClick={() => {if(show === "none") setShow("flex"); else setShow("none");}} > {show === "none" ? "New Contact" : "Close"  }</Button> 
                </Col>
            </Row>
            <Row style={{display : show }}> 
                <Col>
                <AddContactsForm />
                </Col>
            </Row>
            <Row> 
                <Col>
                <ContatsList />
                </Col>
            </Row>
            
            </Container>
        </div>
    )
}

export default Contacts
