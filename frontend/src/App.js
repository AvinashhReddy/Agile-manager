
import './App.css';
import {useState} from 'react'
import {Form,Navbar,Nav,} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router ,Route,Switch,} from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import OnLogin from './onLogin';
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import Home from './Home';




function App() {
  
var [title,setTitle]=useState()
  
  const isLogin=useSelector(state=>state.logInCheck)

  
  const style={
    color:'lightblue'
  }
  const style1={
    
      color:'#00FFFF' ,
     
      
     
      textAlign :'center',
      paddingTop:'13vw'
  
  }

 
  useEffect(()=>{
   
   
  
},[])
  
  return (
    <div>
      
      <Router>
        {
     isLogin &&(
       <Navbar bg="light" variant="light">
    <Navbar.Brand ><h3 style={style}>T r e l l o</h3></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home"></Nav.Link>
      <Nav.Link href="#features"></Nav.Link>
     
    </Nav>
  
    <Form inline>
    <Nav >
   <Nav.Link href="/Home" >Home</Nav.Link>
   
    <Nav.Link href="/Login" onClick={()=>{setTitle(false)}}>Login</Nav.Link>
   
   
    
    
      <Nav.Link href="/Signup">Signup</Nav.Link>
    
     
    </Nav>
      
    </Form>
   

  
  </Navbar>
  
  )
  

}
{ title ?<h1 style={style1}>T R E L L O</h1>:<h1></h1>}
        <Switch>
        <Route path='/Signup' exact component={Signup}/>
          <Route path='/Login' exact component={Login}/>
          <Route path='/OnLogin' exact component={OnLogin}/>
        <Route path='/Home' exact component={Home} />
        <Route path='/' exact component={Home}/>
         
        </Switch>
      </Router>
    
    
    </div>
  );
}

export default App;
