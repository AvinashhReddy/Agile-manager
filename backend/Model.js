const mongoose=require('mongoose')

const schema= new mongoose.Schema({
name:{
    type:String
},
email:{
    type:String
},
password:{
    type:String
},
boards:{
    type: [],
    default :[{bName:'Product Team',bMembers:['A','B','C','D']
    ,toDo:[{tName:'Fix Bug',tMembers:['C','A','D']},
    {tName:'Create Auth Feature',tMembers:['C','A','D']}]
    ,inDev:[{tName:'stage 1',tMembers:['B','A','D']},
    {tName:'stage 2',tMembers:['C','A','D']}]
    ,toReview:[{tName:'Task1',tMembers:['C','A','D']},
    {tName:'Task2',tMembers:['C','A','B']}]
    ,finished:[{tName:'develop UI',tMembers:['B','A','D']},
    {tName:'add logout button',tMembers:['C','A','D']}]



},
{bName:'Marketing Team',bMembers:['A','B','C','D']
    ,toDo:[{tName:'Fix Bugs in the product',tMembers:['C','A','D']},
    {tName:'Create new UI Feature',tMembers:['C','A','D']}]
    ,inDev:[{tName:'stage 1 in dev',tMembers:['B','A','D']},
    {tName:'stage 2 in dev',tMembers:['C','A','D']}]
    ,toReview:[{tName:'Task1',tMembers:['C','A','D']},
    {tName:'Task2',tMembers:['C','A','B']}]
    ,finished:[{tName:'develop UI',tMembers:['B','A','D']},
    {tName:'add logout button',tMembers:['C','A','D']}]



}


]
}



}
)

module.exports=mongoose.model('dataSchema',schema)
