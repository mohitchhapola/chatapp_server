const express =  require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const UserRoute = require('./routes/userRoute')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use('/-v/user',UserRoute)


 app.get('/',(req,res)=>{
    res.send("hello")
 });

 mongoose
 .connect(process.env.MONGO_URI)
 .then(()=>{
     app.listen(PORT,()=>{
         console.log(`port is running on ${PORT}`)
     })
     console.log("connected to database")
 })
 .catch((err)=>console.log(err))