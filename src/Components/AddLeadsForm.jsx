import React ,{useState} from "react";
import { Form, Col, Button } from "react-bootstrap";
import {Alert } from '@material-ui/lab'

function AddLeadsForm({setData , data}) {

  const handleAdd = async () => {
    var lead = await fetch("https://crm-serve.herokuapp.com/leads",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('crmApplication')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(lead.message === "success"){
      console.log(lead.message)
      setLoading(false)
      setData({...data , email : '' , description : ""} )
      setAlert({display : true , message : "Lead created successfully"  , severity : "success" })
    }
    else{
      console.log(lead.message)
      setLoading(false)
      setAlert({display : true , message : lead.message , severity : "error" })
    }

  }

  const handleEdit = async() =>{
    try{
    var lead = await fetch("https://crm-serve.herokuapp.com/leads",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('crmApplication')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(lead.message === "success"){
      console.log(lead.message)
      setLoading(false)
      setData({status : "new"  , email : '' , description : ""} )
      setAlert({display : true , message : "Lead Edited successfully"  , severity : "success" })
    }
    else{
      console.log(lead.message)
      setLoading(false)
      setAlert({display : true , message : lead.message , severity : "error" })
    }
    }catch(err) {
      setLoading(false)
      setAlert({display : true , message : "Something went wrong..." , severity : "error" })
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    if(data._id)
    handleEdit();
    else
    handleAdd();

  }

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data))
    temp[prop] = value;
    setData(temp)
  }
  
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : false , message : ""  , severity : "error" })

  return (
    <>
     { alert.display ?  <Alert severity={alert.severity} onClose={() => { setAlert( {display : false} ) }} >{alert.message}</Alert> : <></> }
    <Form onSubmit={handleOnSubmit} >
        <Form.Row>
      <Form.Group as={Col} md="3" >
      <Form.Label>Lead Contacts </Form.Label>
          <Form.Control placeholder="Email" type="email" onChange={handleOnChange} value={data.email} name="email" />
    </Form.Group>
    <Form.Group as={Col} md="3" >
    <Form.Label>Lead description </Form.Label>
          <Form.Control placeholder="Lead description" type="text" onChange={handleOnChange} value={data.description} name="description" />
          
    </Form.Group>
        <Form.Group as={Col} >
          <Form.Label  htmlFor="inlineFormCustomSelect">Status</Form.Label>
          <Form.Control as="select" id="inlineFormCustomSelect" onChange={handleOnChange} value={data.status} name="status" >
            {data._id ? <> 
            <option value="new">new</option>
            <option value="contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Confirmed">Confirmed</option>
            </> : <option value="new">new</option> }
            
          </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="3" className="pt-4" >
  <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Submit"}</Button>
        </Form.Group>
        </Form.Row>
    </Form>
    </>
  );
}

export default AddLeadsForm;
