const express=require('express')
const app=express()
const cors=require('cors')
const dataSchema=require('./Model')
const mongoose =require('mongoose');
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
const path=require('path')
dotenv.config()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 8080,()=>console.log("running!"))
const url='mongodb+srv://cluster1:cluster1@cluster1.kaiwm.mongodb.net/cluster1?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con=mongoose.connection

con.on('open',function(){
    console.log('connected!');
})
app.get('/getAll',async(req,res)=>{
var data= await dataSchema.find()
res.json(data)
})
app.get('/getsome/:para',async(req,res)=>{
    var data=await dataSchema.find({'email':req.params.para})
     const token=jwt.sign({user:req.body.email},process.env.SECRET_TOKEN)
     res.setHeader('token',token)
     
    res.send(data)
})
app.get('/getsomeWithName/:para',async(req,res)=>{
    var data=await dataSchema.find({'name':req.params.para})
    res.json(data)
})
app.post('/addData',async(req,res)=>{
const newData=new dataSchema({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
    

})
await newData.save()
})
app.put('/createBoard/:para',async(req,res)=>{
  const a=  await dataSchema.findOneAndUpdate({'name':req.params.para},req.body)
  await a.save()
})
app.put('/moveTasks/:para',async(req,res)=>{
    const a=await dataSchema.findOneAndUpdate({'email':req.params.para},req.body)
    await a.save()
})
if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

