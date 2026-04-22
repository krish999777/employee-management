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