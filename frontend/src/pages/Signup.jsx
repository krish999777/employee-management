import './Signup.css'
import {useState} from 'react'
import {postSignup} from '../utils/api.js'
import {useNavigate,Link} from 'react-router-dom'

export default function(){
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    async function handleSubmit(e){
        try{
            setLoading(true)
            setError(null)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const name=formData.get('name')
            const email=formData.get('email')
            const password=formData.get('password')
            const data=await postSignup(name,email,password)
            localStorage.setItem('token',data.token)
            navigate('/account')

        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="signup-container">
            <div className="signup-left">
                <h1>EMS</h1>
                <p>Create your account</p>
                <span>Start managing employees easily.</span>
            </div>
            <div className="signup-right">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h2>Sign Up</h2>
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                    {error && <div className="signup-error">{error}</div>}
                    <p className="signup-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}