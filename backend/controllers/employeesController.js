import db from '../db.js'
import bcrypt from 'bcrypt'

export async function postEmployee(req,res){
    try{
        let {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(400).json({error:"Missing parameters"})
        }
        name=name.trim()
        email=email.trim()
        if(!name||!email){
            return res.status(400).json({error:"Empty Parameters"})
        }
        const isEmail=await db.query(`SELECT 1 FROM users WHERE LOWER(email)=LOWER($1)`,[email])
        if(isEmail.rows.length>0){
            return res.status(409).json({error:"Email already exists"})
        }
        const user=await db.query(`
            INSERT INTO users(name,email,password_hash,role) 
            VALUES ($1,$2,$3,$4)
            RETURNING id,role
            `,
            [name,email,await bcrypt.hash(password,10),'employee']
        )
        res.status(201)
        .json({
            user:{
                id:user.rows[0].id,
                email,
                role:user.rows[0].role
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}
export async function getEmployees(req,res){
    try{
        const allEmployees=await db.query(`
            SELECT users.id,users.name AS name,email,departments.name AS department_name FROM users
            LEFT JOIN departments ON department_id=departments.id
            WHERE role='employee'
            ORDER BY users.id
            `)
        res.status(200).json({employees:allEmployees.rows})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server error"})
    }
}