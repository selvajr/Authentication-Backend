import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./Database/config.js";
import userRouter from "./Routers/userRouter.js";
//importing part

//declaration
dotenv.config()
const app= express()

//middlewares
app.use(express.json())
app.use(cors({
origin:"*",

credentials:true
}))

app.use('/api',userRouter)
//db connection
connectDB()

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the app")
})


app.listen(process.env.PORT,()=>{
console.log("App is listening to the port")

})