import React , {useEffect , useState} from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import {Alert , AlertTitle} from '@material-ui/lab'
import {Table , Button } from 'react-bootstrap'

function ContatsList() {
    useEffect(() => {
         fetch("https://crm-serve.herokuapp.com/contact", {
             method : "GET",
             headers : {
                "auth" : localStorage.getItem('crmApplication')
             }
         } ).then(res => res.json()).then((data) =>{
             // Upadte 
             setLoading(false)
             if(data.message === "success"){
                console.log(data)
                setContacts(data.contacts)
             }
             else{
                setAlert({display : true , message : data.message })
             }
         }).catch((err) => {
            setAlert({display : true , message : "Something went wrong try again later" })
         })
    }, [])
    const [contacts , setContacts ] =useState([])
    const [loading , setLoading ] = useState(true)
    const [alert , setAlert ] = useState({display : false , message : "" })

    if(loading) 
        return(<>
            <Skeleton variant="rect" height={"50px"}  />
            <Skeleton variant="rect" height={"50px"}  />
            <Skeleton variant="rect" height={"50px"}  /> </>)
    
    else
    return (
        <> 
        {alert.display ? <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  {alert.message}<strong> - check it out!</strong>
</Alert> : <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Company</th>
    </tr>
  </thead>
  <tbody>
{contacts.map( (contact , index ) => ( 
                <tr key={contact._id}>
                <td>{index+1}</td>
              <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.company}</td>
              </tr>
    )) }
  </tbody>
</Table> } 
        </>
    )
}

export default ContatsList
