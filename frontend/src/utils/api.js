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
    const token=localStorage.getItem('token')
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
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/departments`,{
        headers:{"authorization":token}
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function getEachEmployee(id){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,{
        headers:{"authorization":token}
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function putEachEmployee(id,name,email,department_id){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authorization":token
        },
        body:JSON.stringify({
            name,email,department_id
        })
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function deleteEmployee(id){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,{
        method:"DELETE",
        headers:{
            "authorization":token
        }
    })
    if(res.status===204)return
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function createEmployee(name,email,password){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`,{
        method:'POST',
        headers:{
            "authorization":token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,email,password
        })
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function getAuthMe(){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`,{
        headers:{"authorization":token}
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}
export async function postDepartment(name){
    const token=localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/departments`,{
        method:'POST',
        headers:{
            "authorization":token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name
        })
    })
    const data=await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }
    return data
}