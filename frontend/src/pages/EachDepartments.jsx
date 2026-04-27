import './EachDepartments.css'
import {useParams,useNavigate} from 'react-router-dom'
import {getAllDepartments,deleteDepartment,editDepartment} from '../utils/api.js'
import {useState,useEffect} from 'react'

export default function(){
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [isEditing,setIsEditing]=useState(false)
    const [data,setData]=useState(null)

    const {id}=useParams()
    const navigate=useNavigate()

    async function fetchData(){

        try{
            setError(null)
            setLoading(true)
            const data=await getAllDepartments()
            const dep=data.departments.filter(dep=>dep.id===Number(id))[0]
            if(!dep){
                setError('Not Found')
                return 
            }
            setData(dep)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[id])
    async function handleDelete(){
        if(confirm('Do you want to delete this department?')){
            await deleteDepartment(id)
            navigate('/departments')
        }  
    }
    async function handleSubmit(e){
        try{
            setLoading(true)
            setError(null)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const name=formData.get('name')
            await editDepartment(id,name)
            await fetchData()
            setIsEditing(false)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
    <div className="each-department-container">

        <div className="each-department-header">
            <button 
                className="back-btn"
                onClick={() => navigate('/departments')}
            >
                ← Back to Departments
            </button>
        </div>

        {loading && <div className="each-departments-loading">Loading...</div>}
        {error && <div className="each-departments-error">{error}</div>}

        {data && !isEditing && (
            <div className="each-department-card">
                <h2>{data.name}</h2>

                <div className="each-department-actions">
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button className="danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        )}

        {isEditing && (
            <div className="each-department-edit-card">
                <h2>Edit Department</h2>

                <form onSubmit={handleSubmit} className="department-form">
                    <input 
                        type="text" 
                        required 
                        defaultValue={data.name} 
                        name="name"
                    />

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="submit-btn"
                        >
                            {loading ? 'Submitting...' : 'Save'}
                        </button>

                    </div>
                </form>
            </div>
        )}

    </div>
)
}