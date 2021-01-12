import { useState } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {Link,} from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'
import {Nav,Navbar,Form,Button,Modal,Card, Col} from 'react-bootstrap'

//Function for Modal 1--------------
function MyVerticallyCenteredModal(props) {
    const user=useSelector(state=>state.user)
    const [userName,setUserName]=useState()
    const [boardname,setboardname]=useState()
    const [data,setData]=useState([])
    const [bMem, ubmem]=useState([])
    const url='/getAll'
    
    useEffect(async()=>{
        
    await axios.get(url)
    .then(res=>{
        
    setData(res.data)})
    await axios.get('/getsome/'+user)
        .then(res=>{
            let a=bMem
            a.push(res.data[0].name)
            console.log(a)
            setUserName(res.data[0].name)
            ubmem(a)
        })
   },[])
    
    function boardnameHandler(event){
        setboardname(event.target.value)
       
     }
     const handleChange=(event)=>{
         var b=bMem
         b.push(event.target.value)
         var s=new Set(b)
         b=Array.from(s)

ubmem(b)
console.log(b)
     }
 async function createBoard(){
     if(boardname){
         let url='/createBoard/'
         let url1='/getsomeWithName/'
         
         for(let i=0;i<bMem.length;i++)
         { 
            await axios.get(url1+bMem[i])
            .then(async(res)=>{let item=res.data
                let boards=item[0].boards
                boards.push({bName:boardname,bMembers:bMem
                ,toDo:[{tName:'Fix Bug',tMembers:['C','A','D']},
                {tName:'Create Auth Feature',tMembers:['C','A','D']}]
                ,inDev:[{tName:'stage 1',tMembers:['B','A','D']},
                {tName:'stage 2',tMembers:['C','A','D']}]
                ,toReview:[{tName:'Task1',tMembers:['C','A','D']},
                {tName:'Task2',tMembers:['C','A','B']}]
                ,finished:[{tName:'develop UI',tMembers:['B','A','D']},
                {tName:'add logout button',tMembers:['C','A','D']}] })

                axios.put(url+bMem[i],{boards:boards})


            }
            )


alert('Board Created')

          }
    }
    else
    alert('please Enter Board Name')
}


    
         
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Create Board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
         <Col sm="4">
         <h5>Enter board name</h5>
        <Form>
        <Form.Group controlId="formBasicPassword">
    
  
    <Form.Control type="text" onChange={(event)=>boardnameHandler(event)} placeholder="boardName" />
    
    <h5>Add members</h5>
    <select 
         
        onChange={(event)=>handleChange(event)} 
      >
        <option>select</option>
     {data.map((a,b)=>{
      return (<><option value={a.name}>{a.name} </option>  </>)
    
  })
}
</select>
  <h5>Added Members:</h5>

  </Form.Group>
  </Form>
  </Col>
  {bMem.map((a,b)=>{
      if(a!==userName)
    return (<p style={{display:'inline',paddingLeft:'1vw'}}>{a}<Button variant="danger" onClick={()=>{let a=bMem
    a.splice(b,1)
ubmem(a)}}>-</Button></p>)
})}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createBoard}>Create</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


//Function for Modal2 ----------------------
  function MyVerticallyCenteredModal2(props) {
    const [taskName, setTaskName]=useState('')
    const [taskType,setTaskType]=useState('')

    const tasknameHandler=(event)=>{
setTaskName(event.target.value)

    }
    const handleChange=(event)=>{
setTaskType(event.target.value)
    }
    const onTaskCreate=async()=>{
      if(taskType!=='' && taskName!==''){
    let data=props.data
    data.boards[props.index][taskType].push({tName:taskName,tMembers:['C','A','B']})
    await axios.put('/moveTasks/'+props.data.email,data)
    alert('Task Created')
      }
      else
      alert("please fill in all the fields")

    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col sm="4">
         <h5>Enter board name</h5>
        <Form>
        <Form.Group controlId="formBasicPassword">
    
  
    <Form.Control type="text" onChange={(event)=>tasknameHandler(event)} placeholder="taskName" />
    
    <h5>Select Category</h5>
    <select 
         
        onChange={(event)=>handleChange(event)} 
      >
        <option value=''>select</option>
        <option value='toDo'>to Do</option>
        <option value='inDev'>in Dev</option>
        <option value='toReview'>to be reviewed</option>
        <option value='finished'> finished</option>
</select>
  

  </Form.Group>
  </Form>
  </Col>
  
          
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onTaskCreate}>Create</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  

 //component--------------- 
function OnLogin(){
    const [data,setData]=useState({boards:[{bMembers:['A'],toDo:[{tName:'',tMembers:['A']}],inDev:[{tName:'',tMembers:['A']}],toReview:[{tName:'',tMembers:['A']}],finished:[{tName:'',tMembers:['A']}]}]})
   const [flag, setFlag]=useState(true)
   const [index,setIndex]=useState()
  
    const user=useSelector(state=>state.user)
    const url='/getsome/'+user
   
    axios.get(url)
    .then(res=>{
    
setData(res.data[0])})
    
    const dispatch=useDispatch()

    useEffect(()=>{
      
     
        dispatch({type:'IN'})
    })
    useEffect(()=>{
      if(user===''){
        alert('please login again')
       
      }
      setFlag(localStorage.getItem('flag'))
     
       
    },[])
    const [modalShow, setModalShow] = useState(false);
    const style={
        color:'#1E90FF' ,
        padding:'2vw',
        paddingLeft:'4vw',
        display: 'inline-block'
    }
    const style1={
        color:'#00FFFF' ,
       
        paddingLeft:'70vw',
        display: 'inline-block'
    }
  
function onBoardClick(i){
setFlag(false)
console.log(i)
setIndex(i)
localStorage.setItem('flag',false)
}
const goBack=()=>{
  setFlag(true)
  localStorage.setItem('flag',true)
}
const moveTo=async(event,c,i)=>{
  let current=c
  let to=event.target.value
  if(current!==to && current!==''){
     let boards=data.boards
     boards[index][to].push(boards[index][current][i])
     boards[index][current].splice(i,1)
     await axios.put('/moveTasks/'+user,{boards:boards})
  }

}


    return (
        <div>
            


           <Navbar bg="primary" variant="dark">
    <Navbar.Brand >T R E L L O</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link >Welcome, {user}</Nav.Link>
     
    </Nav>
    <Form inline>
     <Link to='/Login'>
      <Button variant="outline-light">Logout</Button>
      </Link>
    </Form>
  </Navbar> 
  { flag &&
  <div>
  <h3 style={style}>Boards</h3>
  
  <div style={style1}>
  <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Board
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
</div>
{data.boards.map((x,i)=>{
   return( <div style={{ paddingLeft:'2vw' ,display:'inline-block'}}>
<Card style={{ width: '18rem', }}>
  <Card.Body>
    <Card.Title>{x.bName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Members:</Card.Subtitle>
    
      <Card.Text>
           {x.bMembers[0]} and others..
        </Card.Text>
  
    
    <br></br>
    <Button onClick={()=>onBoardClick(i)}>view</Button>
   
  </Card.Body>
</Card>
</div>)
})}

</div>
}
{ !flag &&

<>
  <div style={{paddingTop:'1vw',paddingLeft:'2vw',display:'inline-block'}}> <Button onClick={goBack} >Go Back</Button> </div>
  <div style={{paddingTop:'1vw',paddingLeft:'80vw',display:'inline-block'}}> <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Task
      </Button>

      <MyVerticallyCenteredModal2
        show={modalShow}
        onHide={() => setModalShow(false)} index={index} data={data}/> </div>
{ 
  <div style={{padding:'2vw',}}>
<h3 style={{color:'#ff0000'}}>to do :</h3>

{data.boards[index].toDo.map((a,b)=>{
    return (
      <div style={{padding:'1vw',display:"inline-block"}} >
<Card style={{ width: '16rem',color:'black' }}>
  <Card.Body>
    <Card.Title>{a.tName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Task :</Card.Subtitle>
    <Card.Text>
    to complete " {a.tName} "
    </Card.Text>
    <h5 style={{color:'	#00bfff'}}>Move to :</h5>
    <select onChange={(event)=>{moveTo(event,'toDo',b)}} value=''>
    <option>select</option>
      <option value='toDo'>to do</option>
      <option value='inDev'>to dev</option>
      <option value='toReview'>to review</option>
      <option value='finished'>finished</option>
    </select>
   
  </Card.Body>
</Card>
</div>
    )
})}

</div> }


<div style={{ padding:'2vw' }} >
<h3 style={{color:'#ff8000'}}>in development :</h3>
{data.boards[index].inDev.map((a,b)=>{
    return (
      <div style={{padding:'1vw',display:"inline-block"}}>
<Card style={{ width: '16rem',color:'black' }}>
  <Card.Body>
    <Card.Title>{a.tName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Task :</Card.Subtitle>
    <Card.Text>
      to complete " {a.tName} "
    </Card.Text>
    <h5 style={{color:'	#00bfff'}}>Move to :</h5>
    <select onChange={(event)=>{moveTo(event,'inDev',b)}} value=''>
    <option>select</option>
      <option value='toDo'>to do</option>
      <option value='inDev'>to dev</option>
      <option value='toReview'>to review</option>
      <option value='finished'>finished</option>
    </select>
   
  </Card.Body>
</Card>
</div>
    )
})}

</div>


<div  style={{padding:'2vw'}}>
<h3 style={{color:'#80ff00'}}>to be reviewed :</h3>
{data.boards[index].toReview.map((a,b)=>{
    return (
      <div style={{padding:'1vw',display:"inline-block"}}>
<Card style={{ width: '16rem',color:'black' }}>
  <Card.Body>
    <Card.Title>{a.tName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Task :</Card.Subtitle>
    
    <Card.Text >
    to complete " {a.tName} "
    </Card.Text>
    
    <h5 style={{color:'	#00bfff'}}>Move to :</h5>
    <select onChange={(event)=>{moveTo(event,'toReview',b)}} value=''>
    <option>select</option>
      <option value='toDo'>to do</option>
      <option value='inDev'>to dev</option>
      <option value='toReview'>to review</option>
      <option value='finished'>finished</option>
    </select>
   
  </Card.Body>
</Card>
</div>
    )
})}

</div>


<div  style={{ padding:'2vw'}}>
<h3 style={{color:'#008c00',}}>finished :</h3>
{data.boards[index].finished.map((a,b)=>{
    return (
      
      <div style={{padding:'1vw',display:"inline-block"}}>
<Card style={{ width: '16rem', color:'black'}}>
  <Card.Body>
    <Card.Title>{a.tName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Task :</Card.Subtitle>
    <Card.Text>
    to complete " {a.tName} "
    </Card.Text>
    <h5 style={{color:'	#00bfff'}}>Move to :</h5>
    <select onChange={(event)=>{moveTo(event,'finished',b)}} value=''>
    <option>select</option>
      <option value='toDo'>to do</option>
      <option value='inDev'>to dev</option>
      <option value='toReview'>to review</option>
      <option value='finished'>finished</option>
    </select>
   
  </Card.Body>
</Card>
</div>
    )
})} 

</div>

</>
 }
        </div>
    )
}

export default OnLogin