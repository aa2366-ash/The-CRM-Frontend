import React, {useState} from 'react'
import {Form , Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setCurrentUser} from '../Redux/User/user-actions'
import {Alert} from '@material-ui/lab'

function Login({setCurrentUser}) {
  const handleOnSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    //Send data to server
    try {
    var user = await fetch("https://crm-serve.herokuapp.com/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    console.log(user)
    if(user.message === "success"){
    setLoading(false)
    setCurrentUser(user.user)
    localStorage.setItem("crmApplication",user.jwtToken)
    localStorage.setItem("userDetails",JSON.stringify(user.user))
    }
    else{
      setLoading(false)
      setAlert({display : "flex" , message : user.message })
      console.log(user.message)

    }

  }
  catch(err) {
    console.log(err)
    setLoading(false)
  }

  }

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data))
    temp[prop] = value;
    setData(temp)
  }

  const [data, setData] = useState({email : '' , password : "" })
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : "none" , message : "" })

    return (
        <div>
    <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={data.email} onChange={handleOnChange} name="email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={data.password} onChange={handleOnChange} name="password" />
  </Form.Group>
  <Button variant="primary" type="submit" disabled={loading}>
    {loading ? "Please Wait.." : "Login" }
  </Button>
</Form>
    <Alert severity="error" style={{display : alert.display }} onClose={() => {setAlert({display : 'none'})}}>{alert.message}</Alert>
        </div>
    )
}

const mapStateToProps = (state) => (null)

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});


export default connect(null,mapDispatchToProps)(Login)
