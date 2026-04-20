import express from 'express'
import dotenv from 'dontenv'
dotenv.config()

const app=express()
app.listen(process.env.PORT,()=>console.log('Listening at port '+process.env.PORT))