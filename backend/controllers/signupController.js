import bcrypt from 'bcrypt'
import db from '../db.js'
import {generateToken} from '../utils/jwt.js'

export async function signupController(req,res){
    try{
        let {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(400).json({error:"Missing parameters"})
        }
        name=name.trim()
        email=email.trim()
        if(!name||!email||!password){
            return res.status(400).json({error:"Missing parameters"})
        }
        const isEmail=await db.query(`SELECT 1 FROM users WHERE LOWER(email)=LOWER($1)`,[email])
        if(isEmail.rows.length>0){
            return res.status(409).json({error:"Email already exists"})
        }
        
        const userData=await db.query(`INSERT INTO users(name,email,password_hash,role) VALUES ($1,$2,$3,$4) RETURNING id, role;`,[name,email,await bcrypt.hash(password,10),'employee'])
        const {id,role}=userData.rows[0]
        const token=generateToken({
            role,
            id
        })
        res.status(201)
        .json({
            token:`BEARER ${token}`,
            user:{
                id,
                email,
                role
            }
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}