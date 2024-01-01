const express = require('express')
const cors=require('cors');
const bodyParser=require('body-parser')
require('dotenv').config()
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


const userroute=require('./routes/user')

app.use('/user',userroute);


const port = process.env.PORT 


app.listen(5000,()=>console.log(`server running on port ${port}`));