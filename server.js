const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors');
const bodyParser=require('body-parser')
const helmet=require('helmet')
require('dotenv').config()
const app = express();

app.use(cors())
app.use(express.json())
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))


const userroute=require('./routes/user')

app.use('/user',userroute);


const port = process.env.PORT 

mongoose.connect(`mongodb+srv://bcae208924402018:${process.env.DB_PASSWORD}@cluster0.ieth7oj.mongodb.net/busbookingapp?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(port,()=>console.log(`server running on port ${port}`));
    })
    .catch(err => console.log(err));
