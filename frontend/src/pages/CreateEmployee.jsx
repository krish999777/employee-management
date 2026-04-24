import './CreateEmployee.css'
import {useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {createEmployee} from '../utils/api.js'

export default function(){
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const navigate=useNavigate()

    async function handleSubmit(e){
        try{
            setError(null)
            setLoading(true)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const name=formData.get('name')
            const email=formData.get('email')
            const password=formData.get('password')
            await createEmployee(name,email,password)
            navigate('/employees')

        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return(
    <div className="create-employee-container">
        <div className="create-employee-header">
            <Link to="/employees" className="back-link">
                ← Back to employees
            </Link>
        </div>
        <div className="create-employee-card">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit} className="create-employee-form">
                <div className="input-group">
                    <label>Name</label>
                    <input type="text" name="name" required />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" required minLength={7} />
                </div>
                <button disabled={loading}>
                    {loading ? 'Creating...' : 'Create Employee'}
                </button>
                {error && (
                    <div className="create-employee-error">{error}</div>
                )}
            </form>
        </div>
    </div>
)
}