import express from 'express'
import {isAdmin} from '../middleware/isAdmin.js' 
import {postDepartment,getDepartments} from '../controllers/allDepartmentsController.js'
import {deleteDepartment,putDepartment} from '../controllers/eachDepartment.js'

const router=express.Router()

router.post('/',isAdmin,postDepartment)
router.get('/',getDepartments)
router.delete('/:id',isAdmin,deleteDepartment)
router.put('/:id',isAdmin,putDepartment)

export default router