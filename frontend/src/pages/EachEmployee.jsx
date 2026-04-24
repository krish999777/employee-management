import './EachEmployee.css'
import {useParams,Link,useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {getAllDepartments, getEachEmployee,putEachEmployee,deleteEmployee} from '../utils/api.js'

export default function(){
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [userData,setUserData]=useState(null)
    const [departments,setDepartments]=useState([])
    const [isEditing,setIsEditing]=useState(false)
    
    const {id}=useParams()
    const navigate=useNavigate()

    async function fetchEachEmployee(){
        try{
            setLoading(true)
            const data=await getEachEmployee(id)
            setUserData(data.user)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchEachEmployee()
    },[id])
    useEffect(()=>{
        async function getDepartments(){
            try{
                setLoading(true)
                const departmentsData=await getAllDepartments()
                setDepartments(departmentsData.departments)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        getDepartments()
    },[])
    async function handleSubmit(e){
        try{
            setLoading(true)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const name=formData.get('name')
            const email=formData.get('email')
            const dep=formData.get('departments')
            await putEachEmployee(id,name,email,Number(dep))
            setIsEditing(false)
            await fetchEachEmployee()
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    async function deleteUser(){
        try{
            if(confirm('Are you sure you want to delete')){
                await deleteEmployee(id)
                navigate('/employees')
            }
        }catch(err){
            setError(err.message)
        }
    }
    return(
    <div className="each-employee-container">
        <div className="each-employee-header">
            <Link to="/employees" className="back-link">← Back to employees</Link>
        </div>
        {error && <div className="each-employee-error">{error}</div>}
        {loading && <div className="each-employee-loading">Loading...</div>}
        {userData && !isEditing && (
            <div className="each-employee-card">
                <div className="each-employee-info">
                    <h2>{userData.name}</h2>
                    <div className="each-employee-field">
                        <span>Email</span>
                        <p>{userData.email}</p>
                    </div>
                    <div className="each-employee-field">
                        <span>Department</span>
                        <p>{userData.department_name || 'No department'}</p>
                    </div>
                </div>
                <div className="each-employee-actions">
                    <Link 
                        to={`/departments/${userData.department_id}`} 
                        className="dept-link"
                    >
                        View Department
                    </Link>
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button className="danger" onClick={deleteUser}>
                        Delete
                    </button>
                </div>
            </div>
        )}
        {isEditing && (
            <div className="each-employee-edit-card">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit} className="each-employee-form">
                    <div className="input-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            defaultValue={userData.name} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            defaultValue={userData.email} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Department</label>
                        <select 
                            name="departments"
                            defaultValue={userData.department_id ? userData.department_id : -1}
                        >
                            <option value={-1}>No department</option>
                            {departments.map(dep => (
                                <option key={dep.id} value={dep.id}>
                                    {dep.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        )}
    </div>
)
}