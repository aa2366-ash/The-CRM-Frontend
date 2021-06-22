import React , {useState} from 'react'
import {Form , Col, Button } from 'react-bootstrap'
import {Alert } from '@material-ui/lab'

function AddContactsForm() {
    
  const handleOnSubmit = async (event) => {

    setLoading(true)

    event.preventDefault()
    try{
    var contact = await fetch("https://crm-serve.herokuapp.com/contact",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('crmApplication')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(contact.message === "success"){
      console.log(contact.message)
      setLoading(false)
      setAlert({display : true , message : "service created successfully"  , severity : "success" })
    }
    else{
      console.log(contact.message)
      setLoading(false)
      setAlert({display : true , message : contact.message , severity : "error" })
    }
  }catch(err){
    setLoading(false)
    setAlert({display : true , message : "Something went wrong..." , severity : "error" })
  }

  }

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data))
    temp[prop] = value;
    setData(temp)
  }

  const [data, setData] = useState({email : '' , name : "" , company : "" })
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : false , message : "" ,severity : "error" })

    return (
      <>
      { alert.display ?  <Alert severity={alert.severity} onClose={() => { setAlert( {display : false} ) }} >{alert.message}</Alert> : <></> }
    
<Form onSubmit={handleOnSubmit} >
  <Form.Row>
    <Col md={3}>
      <Form.Control placeholder="Name" type="text" onChange={handleOnChange} name="name" value={data.name} />
    </Col>
    <Col md={3}>
      <Form.Control placeholder="email" type="email" onChange={handleOnChange} name="email" value={data.email} />
    </Col>
    <Col md={3}>
      <Form.Control placeholder="company" type="text" onChange={handleOnChange} name="company" value={data.company} />
    </Col>
    <Col md={3}>
      <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Submit"}</Button>
    </Col>
  </Form.Row>
</Form>
</>
    )
}

export default AddContactsForm
