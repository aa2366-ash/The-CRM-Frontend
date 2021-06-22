import React , { useState, useEffect} from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import {Alert , AlertTitle} from '@material-ui/lab'
import {Table , Button } from 'react-bootstrap'

function LeadList({setData , setShow}) {
    useEffect(() => {
        fetch("https://crm-serve.herokuapp.com/leads", {
            method : "GET",
            headers : {
               "auth" : localStorage.getItem('crmApplication')
            }
        } ).then(res => res.json()).then((data) =>{
            // Upadte 
            setLoading(false)
            if(data.message === "success"){
               console.log(data)
               setLeads(data.leads)
            }
            else{
               setAlert({display : true , message : data.message })
            }
        }).catch((err) => {
          setLoading(false)
           setAlert({display : true , message : "Something went wrong try again later" })
        })
   }, [])

   const reRender = () => {
    fetch("https://crm-serve.herokuapp.com/leads", {
      method : "GET",
      headers : {
         "auth" : localStorage.getItem('crmApplication')
      }
  } ).then(res => res.json()).then((data) =>{
      // Upadte 
      setLoading(false)
      if(data.message === "success"){
         console.log(data)
         setLeads(data.leads)
      }
      else{
         setAlert({display : true , message : data.message })
      }
  }).catch((err) => {
    setLoading(false)
     setAlert({display : true , message : "Something went wrong try again later" })
  })
}
   

   const [leads , setLeads ] =useState([])
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
     <th>Lead contact</th>
     <th>Description</th>
     <th>Status</th>
     <th>Created By</th>
     <th>Action</th>
   </tr>
 </thead>
 <tbody>
{leads.map(lead => ( 
               <tr key={lead._id}>
               <td>{lead.email}</td>
             <td>{lead.description}</td>
               <td>{lead.status}</td>
               <td>{lead.createdBy.name}</td>
               <td> 
                   <Button onClick={()=>{setData({_id : lead._id , email : lead.email , description : lead.description , status : lead.status }); setShow("flex");}}>Edit</Button>
               </td>
             </tr>
   )) }
 </tbody>
</Table> } 
       </>
   )
}

export default LeadList
