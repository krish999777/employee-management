import db from '../db.js'

export async function deleteDepartment(req,res){
    try{
        const paramsId=req.params.id
        const deleteQuery=await db.query(`DELETE FROM departments WHERE id=$1 RETURNING name`,[paramsId])
        if(deleteQuery.rows.length==0){
            return res.status(404).json({error:"Department not found"})
        }
        res.status(204).send()
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}
export async function putDepartment(req,res){
    try{
        const paramsId=req.params.id
        let {name}=req.body
        if(!name){
            return res.status(400).json({error:"Missing name parameter"})
        }
        name=name.trim().toLowerCase()
        if(!name){
            return res.status(400).json({error:"Name cannot be empty"})
        }
        const isId=await db.query(`SELECT 1 FROM departments WHERE id=$1`,[paramsId])
        if(isId.rows.length===0){
            return res.status(404).json({error:"Department not found"})
        }
        const isName=await db.query(`SELECT 1 FROM departments WHERE name=$1`,[name])
        if(isName.rows.length>0){
            return res.status(409).json({error:"Department already exists"})
        }
        const newDepartment=await db.query(`UPDATE departments SET name=$1 WHERE id=$2 RETURNING name`,[name,paramsId])
        const {name:newName}=newDepartment.rows[0]
        res.status(200).json({
            department:{id:paramsId,name:newName}
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}