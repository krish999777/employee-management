import db from '../db.js'

export async function postDepartment(req,res){
    try{
        let {name}=req.body
        if(!name){
            return res.status(400).json({error:"Missing name"})
        }
        name=name.trim().toLowerCase()
        if(!name){
            return res.status(400).json({error:"Name cannot be empty"})
        }
        const isName=await db.query(`SELECT 1 FROM departments WHERE name=$1`,[name])
        if(isName.rows.length>0){
            return res.status(409).json({error:"Department already exists"})
        }
        const department=await db.query(`
            INSERT INTO departments(name) VALUES ($1) RETURNING id,name
        `,[name])
        const {id,name:newName}=department.rows[0]
        res.status(201).json({department:{id,name:newName}})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}
export async function getDepartments(req,res){
    try{
        const allDepartments=await db.query(`SELECT id,name FROM departments ORDER BY id`)
        res.status(200).json({departments:allDepartments.rows})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}