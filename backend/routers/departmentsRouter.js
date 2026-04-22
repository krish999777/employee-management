import express from 'express'
import {isAdmin} from '../middleware/isAdmin.js' 
import {postDepartment,getDepartments} from '../controllers/allDepartmentsController.js'

const router=express.Router()

router.post('/',isAdmin,postDepartment)
router.get('/',getDepartments)

export default router