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