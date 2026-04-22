import express from 'express'
import {signupController} from '../controllers/signupController.js'
import {loginController} from '../controllers/loginController.js'
import {meController} from '../controllers/meController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
import {createAdmin} from '../controllers/createAdminController.js'

const router=express.Router()
router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/me',authMiddleware,meController)
router.post('/createadmin',authMiddleware,createAdmin)
export default router