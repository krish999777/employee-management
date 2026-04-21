import express from 'express'
import {postEmployee,getEmployees} from '../controllers/employeesController.js'
import {getEachEmployee} from '../controllers/eachEmployee.js'
import {isAdmin} from '../middleware/isAdmin.js'

const router=express.Router()
router.post('/',isAdmin,postEmployee)
router.get('/',isAdmin,getEmployees)
router.get('/:id',getEachEmployee)

export default router