import './Departments.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getAllDepartments,postDepartment,getAuthMe} from '../utils/api.js'

export default function(){
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [data,setData]=useState(null)
    const [isEditing,setIsEditing]=useState(false)
    const [userRole,setUserRole]=useState()

    async function fetchDepartments(){
        try{
            setError(null)
            setLoading(true)
            const data=await getAllDepartments()
            const roleData=await getAuthMe()
            const {role}=roleData.user
            setUserRole(role)
            setData(data.departments)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchDepartments()
    },[])
    async function handleSubmit(e){
        try{
            setError(null)
            setLoading(true)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const name=formData.get('name')
            await postDepartment(name)
            await fetchDepartments()
            setIsEditing(false)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
    <div className="departments-container">
        <div className="departments-header">
            <h2>Departments</h2>
            {(!isEditing&&userRole==='admin') && (
                <button 
                    className="create-btn"
                    onClick={() => setIsEditing(true)}
                >
                    + Create Department
                </button>
            )}
        </div>
        {loading && <div className="departments-loading">Loading...</div>}
        {error && <div className="departments-error">{error}</div>}
        {!loading && data && data.length === 0 && (
            <div className="departments-empty">
                No departments found
            </div>
        )}
        {data && !isEditing && (
            <div className="departments-list">
                {data.map(dep => (
                    <div key={dep.id} className="department-item">
                        <Link to={`/departments/${dep.id}`} className="department-link">
                            <span className="department-name">{dep.name}</span>
                        </Link>
                    </div>
                    ))}
            </div>
        )}
        {isEditing && (
            <div className="editing-container">
                <form onSubmit={handleSubmit} className="department-form">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Department name"
                        required 
                    />
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="departments-cancel-btn"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="departments-submit-btn" disabled={loading}>
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
)
}