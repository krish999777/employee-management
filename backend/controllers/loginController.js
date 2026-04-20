import bcrypt from 'bcrypt'
import db from '../db.js'

export async function loginController(req,res){
    try{
        let {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({error:"Missing parameters"})
        }
        email=email.trim()
        if(!email){
            return res.status(400).json({error:"Missing parameters"})
        }
        const isEmail=await db.query(`SELECT 1 FROM users WHERE LOWER(email)=LOWER($1)`,[email])
        if(isEmail.rows.length===0){
            return res.status(401).json({error:"Invalid credentials"})
        }
        const userData=await db.query(`SELECT id, password_hash, role FROM users WHERE LOWER(email) = LOWER($1);`,[email])
        const {id,password_hash,role}=userData.rows[0]
        const isPasswordCorrect=await bcrypt.compare(password,password_hash)
        if(!isPasswordCorrect){
            return res.status(401).json({error:"Invalid credentials"})
        }
        return res.status(200).json({
            token:`BEARER ${1}`,
            user: {
            id,
            email,
            role
  }
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal server error"})
    }
}