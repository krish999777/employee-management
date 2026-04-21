import express from 'express'
import {postEmployee} from '../controllers/employeesController.js'
import {isAdmin} from '../middleware/isAdmin.js'

const router=express.Router()
router.post('/',isAdmin,postEmployee)

export default router