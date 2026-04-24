const token=localStorage.getItem('token')

export async function postLogin(email,password){
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email,password})
    })
    const data=await res.json()
    if (!res.ok) {
       throw new Error(data.error || "Login failed")
    }
    return data
}
export async function postSignup(name,email,password){
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name,email,password
        })
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error||"Sign up failed")
    }
    return data
}
export async function getAllEmployees(search="",dep=-1,page=1){
    let depQuery=""
    if(dep!==-1){
        depQuery=`&department_id=${dep}`
    }
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees?search=${search}&page=${page}`+depQuery,{
        headers:{"authorization":token}
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function getAllDepartments(){
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/departments`,{
        headers:{"authorization":token}
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}