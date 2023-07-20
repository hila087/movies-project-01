import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/auth.hook"


export default function Login() {

    // States
    const navigate = useNavigate()
    const { signup } = useAuthContext()
    const [error, setError] = useState(null)

    // Handlers
    const submitHandler = async e => {
        e.preventDefault()
        const [{ value: fname }, { value: sname }, { value: age }, { value: email }, { value: password }] = e.target
        try {
            const res = await signup(fname, sname, age, email, password)
            navigate('/', {replace: false})
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="Login">
            <form className='auth-form' onSubmit={submitHandler}>
                <h2>Sign Up</h2>

                <input className='auth-text-input' type="text" placeholder='First name' minLength={3} maxLength={30} />
                <input className='auth-text-input' type="text" placeholder='Last name' minLength={3} maxLength={30} />
                <input className='auth-text-input' type="number" placeholder='Age' min={18} max={99} />
                <input className='auth-text-input' type="email" placeholder='Email' minLength={3} maxLength={30} />
                <input className='auth-text-input' type="password" placeholder='Password' minLength={6} maxLength={30} />

                <NavLink className='auth-link' to='/login'>Already have an account? Login</NavLink>
                <input type="submit" value="Sign Up" />
                { error && <p className="auth-errmsg">{error}</p> }
            </form>
        </div>
    )
}