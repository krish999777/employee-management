import './Employees.css'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {getAllEmployees,getAllDepartments} from '../utils/api.js'

export default function(){
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [employees,setEmployees]=useState([])
    const [search,setSearch]=useState("")
    const [departments,setDepartments]=useState([])
    const [selectedDepartments,setSelectedDepartments]=useState(-1)
    const [page,setPage]=useState(1)

    useEffect(()=>{
        async function fetchEmployees(){
            try{
                setLoading(true)
                const data=await getAllEmployees(search,selectedDepartments,page)
                setEmployees(data.employees)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchEmployees()
    },[search,selectedDepartments,page])
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
    function handleSearch(e){
        try{
            setLoading(true)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const search=formData.get('search')
            const departments=formData.get('departments')
            setSelectedDepartments(Number(departments))
            setSearch(search)
            setPage(1)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    function prevPage(){
        setPage(prev=>prev-1)
    }
    function nextPage(){
        setPage(prev=>prev+1)
    }
    return(
    <div className="employees-container">
        <div className="employees-header">
        <h2>Employees</h2>
        <div className="employees-header-actions">
            <Link to="/employees/create" className="add-employee-btn">
                + Add Employee
            </Link>
            <form onSubmit={handleSearch} className="employees-filters">
                <input
                    type="text"
                    name="search"
                    placeholder="Search employees..."
                />
                <select name="departments">
                    <option value={-1}>All departments</option>
                    {departments.map(dep => (
                        <option key={dep.id} value={dep.id}>
                            {dep.name}
                        </option>
                    ))}
                </select>
                <button disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    </div>
        {loading && <div className="employees-loading">Loading...</div>}
        {error && <div className="employees-error">{error}</div>}
        {!loading && employees.length === 0 && (
            <div className="employees-empty">No employees found</div>
        )}
        {employees.length !== 0 && (
            <div className="employees-table">
                <div className="employees-row employees-head">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Department</div>
                </div>
                {employees.map(emp => (
                    <div key={emp.id} className="employees-row">
                        <div>
                            <Link to={`/employees/${emp.id}`} className="employee-link">
                                {emp.name}
                            </Link>
                        </div>
                        <div>{emp.email}</div>
                        <div>{emp.department_name || '-'}</div>
                    </div>
                ))}
            </div>
        )}
        <div className="employees-page-container">
            {page !== 1 && (
                <button disabled={loading} onClick={prevPage}>
                    Prev
                </button>
            )}
            <span className="page-number">Page {page}</span>
            <button disabled={loading} onClick={nextPage}>
                Next
            </button>
        </div>
    </div>
)
}