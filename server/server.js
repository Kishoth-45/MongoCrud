const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const Port=3001
const UserModel=require('./Model/User')

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Mongodb Connected'))
.catch((err)=>console.log(err))

app.post('/form',(req,res)=>{
    UserModel.create(req.body)
    .then(result=> res.json(result))
    .catch(err=>console.log(err))
})

app.get('/form',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/form/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        Name: req.body.Name,
        Description : req.body.Description
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/form/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id: id})
     .then(users => res.json(users))
     .catch(err => console.log(err))
})

app.listen(Port,()=>{
    console.log(`server is running on ${Port}`)
})