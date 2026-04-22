import express from 'express'
import {isAdmin} from '../middleware/isAdmin.js' 
import {postDepartment} from '../controllers/allDepartmentsController.js'

const router=express.Router()

router.post('/',isAdmin,postDepartment)

export default router