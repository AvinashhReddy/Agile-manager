import {Form,Button,Col} from 'react-bootstrap'
import {useState} from 'react'

import axios from 'axios'
function Signup(){
    var [name,setName]=useState('')
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    var [cPassword,setCpassword]=useState('')
  
    

    const onsignup=async()=>{
     
      await axios.get('/getsome/'+email)
      .then(async(res)=>{
      
        console.log(res.data.length)
        if (res.data.length>0)
        alert("email already in use")
        else{
          const data={
            name:name,
            email:email,
            password:password
        }
        if(name!=='' && email!=="" && password!==""){
        if(password===cPassword){
            alert("successfully registered, please return to the login page to login")
        await axios.post('/addData',data)
        
        }
        else
        alert("passwords do not match")
        }
        else
        alert("please fill in all the fields")
        }
      })
        
    }
    function usernameHandler(event){
       setName(event.target.value)
      
    }
    function emailHandler(event){
        setEmail(event.target.value)
       
     }
     function passwordHandler(event){
        setPassword(event.target.value)
       
     }
     function cPasswordHandler(event){
        setCpassword(event.target.value)
       
     }
     
    return (
        <div>
           <Col sm="4">
        <Form>
        <Form.Group controlId="formBasicPassword">
    <Form.Label>UserName</Form.Label>
  
    <Form.Control type="text" onChange={(event)=>usernameHandler(event)} placeholder="UserName" />
   
  </Form.Group>
 
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={(event)=>emailHandler(event)} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
  
    <Form.Control type="password" placeholder="Password" onChange={(event)=>passwordHandler(event)} />
   
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
  
    <Form.Control type="password" placeholder="Password" onChange={(event)=>cPasswordHandler(event)}/>
   
  </Form.Group>
 
 
  <Button variant="primary" type="submit" onClick={onsignup}>
   Signup
  </Button>
</Form>
</Col>

        </div>
       
    )
}
export default Signup