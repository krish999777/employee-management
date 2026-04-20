import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routers/authRouter.js'
dotenv.config()

const app=express()
app.use(express.json())
app.use('/auth',authRouter)


app.listen(process.env.PORT,()=>console.log('Listening at port '+process.env.PORT))
