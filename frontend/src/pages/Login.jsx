import './Login.css'
import {postLogin} from '../utils/api.js'
import {useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function(){
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    async function handleSubmit(e){
        setLoading(true)
        setError(null)
        e.preventDefault()
        const form=e.target
        const formData=new FormData(form)
        const email=formData.get('email')
        const password=formData.get('password')
        try{
            const data=await postLogin(email,password)
            localStorage.setItem('token',data.token)
            const role=data.user.role
            if(role==='admin'){
                navigate('/employees')
            }else{
                navigate('/account')
            }
            
        }catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <div className="login-container">
            <div className="login-left">
                <h1>EMS</h1>
                <p>Employee Management System</p>
                <span>Manage your team efficiently.</span>
            </div>
            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Welcome back</h2>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="login-error">{error}</div>}
                    <p className="login-footer">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}