import './Account.css'
import {getAuthMe,getEachEmployee} from '../utils/api.js'
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

export default function(){
    const [data,setData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)

    async function getData(){
        try{
            setLoading(true)
            const meData=await getAuthMe()
            const id=meData.user.id
            const data=await getEachEmployee(id)
            setData(data.user)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    console.log(data)
    return(
    <div className="account-container">

        <div className="account-header">
            <h2>My Account</h2>
        </div>

        {loading && <div className="account-loading">Loading...</div>}

        {error && <div className="account-error">{error}</div>}

        {data && (
            <div className="account-card">
                <div className="account-info">
                    <h3>{data.name}</h3>
                    <div className="account-field">
                        <span>Email</span>
                        <p>{data.email}</p>
                    </div>
                    <div className="account-field">
                        <span>Department</span>
                        <p>{data.department_name || 'No department'}</p>
                    </div>
                    <div className="account-field">
                        <span>Role</span>
                        <p className={`role ${data.role}`}>{data.role}</p>
                    </div>
                </div>
                <div className="account-actions">
                    {data.department_id && (
                        <Link 
                            to={`/departments/${data.department_id}`} 
                            className="dept-link"
                        >
                            View Department
                        </Link>
                    )}
                    <Link 
                        to={`/employees/${data.id}`} 
                        className="edit-btn"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        )}
    </div>
)
}