import React , {useState} from 'react'
import {Form  , Col, Button } from 'react-bootstrap'
import {Alert } from '@material-ui/lab'

function AddServiceForm({setData , data}) {

  const handleAdd = async () => {

    var service = await fetch("https://crm-serve.herokuapp.com/service",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('crmApplication')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(service.message === "success"){
      console.log(service.message)
      setLoading(false)
      setData({...data , email : '' , description : ""} )
      setAlert({display : true , message : "service created successfully"  , severity : "success" })
    }
    else{
      console.log(service.message)
      setLoading(false)
      setAlert({display : true , message : service.message , severity : "error" })
    }

  }

  const handleEdit = async () => {
    try{
    var service = await fetch("https://crm-serve.herokuapp.com/service",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('crmApplication')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(service.message === "success"){
      console.log(service.message)
      setLoading(false)
      setData({status: "created" , email : '' , description : ""} )
      setAlert({display : true , message : "service created successfully"  , severity : "success" })
    }
    else{
      console.log(service.message)
      setLoading(false)
      setAlert({display : true , message : service.message , severity : "error" })
    }
  }catch(err){
    setLoading(false)
    setAlert({display : true , message : "Something went wrong..." , severity : "error" })
  }
  }



  const handleOnSubmit =  (event) => {
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
        <Form onSubmit={handleOnSubmit}>
        <Form.Row>
      <Form.Group as={Col} md="3" >
      <Form.Label>Email Contacts </Form.Label>
          <Form.Control placeholder="Contact email" type="email" onChange={handleOnChange} value={data.email} name="email" />
    </Form.Group>
    <Form.Group as={Col} md="3" >
    <Form.Label>Service request </Form.Label>
          <Form.Control placeholder="Service request description" type="text" onChange={handleOnChange} value={data.description} name="description" />
          
    </Form.Group>
        <Form.Group as={Col}  >
          <Form.Label  htmlFor="inlineFormCustomSelect">Status</Form.Label>
          <Form.Control as="select" id="inlineFormCustomSelect" onChange={handleOnChange} value={data.status} name="status"  >
           {data._id? <>
            <option value="created">Created</option>
            <option value="open">Open</option>
            <option value="in process">In process</option>
            <option value="released">Released</option>
            <option value="cancelled">Cancelled</option>
    <option value="completed">Completed</option> </> : <option value="created">Created</option> }
          </Form.Control>
          </Form.Group>
    
          <Form.Group as={Col} md="3" className="pt-4" >
 
          <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Submit"}</Button>
        </Form.Group>
        </Form.Row>
    </Form>
    </>
    )
}

export default AddServiceForm
