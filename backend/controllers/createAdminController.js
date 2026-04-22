import bcrypt from 'bcrypt'
import db from '../db.js'

export async function createAdmin(req,res){
    try{
        let {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(400).json({error:"Missing parameters"})
        }
        name=name.trim()
        email=email.trim().toLowerCase()
        if(!name||!email){
            return res.status(400).json({error:"Cannot have empty parameters"})
        }
        const isEmail=await db.query(`SELECT 1 FROM users WHERE LOWER(email)=$1`,[email])
        if(isEmail.rows.length>0){
            return res.status(409).json({error:"Email already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await db.query(`INSERT INTO users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') RETURNING id,role`,[name,email,hashedPassword])
        const {id,role}=user.rows[0]
        res.status(201).json({
            user:{
                id,name,email,role
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}