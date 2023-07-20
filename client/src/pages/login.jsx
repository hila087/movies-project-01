import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/auth.hook"


export default function Login() {

    // States
    const navigate = useNavigate()
    const { login } = useAuthContext()
    const [error, setError] = useState(null)

    // Handlers
    const submitHandler = async e => {
        e.preventDefault()
        const [{ value: email }, { value: password }] = e.target
        try {
            const res = await login(email, password)
            navigate('/auth-success', {replace: false})
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="Login">
            <form className='auth-form' onSubmit={submitHandler}>
                <h2>Login</h2>
                
                <input className='auth-text-input' type="email" placeholder='Email' minLength={3} maxLength={30} />
                <input className='auth-text-input' type="password" placeholder='Password' minLength={3} maxLength={30} />

                <NavLink className='auth-link' to='/signup'>Dont have an account? Sign Up</NavLink>
                <input type="submit" value="Login" />
                { error && <p className="auth-errmsg">{error}</p> }
            </form>
        </div>
    )
}