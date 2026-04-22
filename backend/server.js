import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routers/authRouter.js'
import employeesRouter from './routers/employeesRouter.js'
import departmentsRouter from './routers/departmentsRouter.js'
import {authMiddleware} from './middleware/authMiddleware.js'
 
dotenv.config()

const app=express()
app.use(express.json())
app.use('/auth',authRouter)
app.use('/employees',authMiddleware,employeesRouter)
app.use('/departments',authMiddleware,departmentsRouter)


app.listen(process.env.PORT,()=>console.log('Listening at port '+process.env.PORT))
