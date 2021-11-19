const express =require('express');
const app=express();
const helmet=require('helmet')
const morgan=require('morgan')
require('dotenv').config();
const mongoose=require('mongoose')
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
const productRoutes=require('./routes/products')
const categoryRoutes=require('./routes/categories.js')
const cors=require('cors')


// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use((err,req,res,next) => {
    res.status(500).send({message:err.message});
})

// routes
app.use('/users',userRoutes)
app.use('/auth',authRoutes)
app.use('/products',productRoutes)
app.use('/categories',categoryRoutes)

// app.get('/test',(req,res)=>{
//     res.json({success:1111})
// })
mongoose.connect(process.env.LOCAL_DB||`mongodb://127.0.0.1:27017/gomla`,{useNewUrlParser:true},async (err, db)=>{
    if(!err)
    {
       await app.listen(process.env.PORT||8080,()=>{
            console.log('Bakend is runing');
        })
        console.log('db connection successful ... %s',db);
    }
    else console.warn('db connection errors ...');
})


