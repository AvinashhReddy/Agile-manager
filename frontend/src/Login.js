import {Form,Button,Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
function Login(){
    const history = useHistory();
  
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    const dispatch=useDispatch()
    function emailHandler(event){
        setEmail(event.target.value)
       
     }
     function passwordHandler(event){
        setPassword(event.target.value)
       
     }
     function checkLogin(){
    
    const url='/getsome/'+email
    axios.get(url)
    .then((res)=>{
      console.log(res)
        if(res.data.length>0)
        {
        if(password===res.data[0].password){
          dispatch({type:'a',payload:res.data[0].email})
          dispatch({type:'IN'})
        history.push("/OnLogin");
      }
        else
        alert("email or password is incorrect!")
        }
        else
        alert('email or password is incorrect!')
    })
     }
     useEffect(()=>{
    
      localStorage.setItem('user',email)
      dispatch({type:''})
  })
    return (
        <Col sm="4">
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={(event)=>emailHandler(event)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
  
    <Form.Control type="password" placeholder="Password" onChange={(event)=>passwordHandler(event)} />
   
  </Form.Group>
 
 
  <Button variant="primary"  onClick={checkLogin}>
    Login
  </Button>
  
</Form>

     
       
</Col>
       
    )
}
export default Login