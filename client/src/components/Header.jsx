import { NavLink, useNavigate } from 'react-router-dom'
// Hooks
import { useAuthContext } from '../hooks/auth.hook'


export default function Header() {
  
    // States
    const navigate = useNavigate()
    const { signout, state } = useAuthContext()
    // Handlers
    const signoutHandler = () => {
        signout()
        navigate('/')
    }

    // Render navigation-bar for a non-registered user
    if (!state?.user) return (
        <header>
            <NavLink to='/' className='header-logo'>
                <h1>Movies Project</h1>
            </NavLink>
            <nav></nav>
            <div className="profile no-data">
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </header>
    )
    // Render navigation-bar for a registered user
    else return (
        <header>
            <NavLink to='/' className='header-logo'>
                <h1>Movies Project</h1>
            </NavLink>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                </ul>
            </nav>
            <div className="profile registered">
                <h3 className='profile-greet'>Welcome,&nbsp;{state.user?.fname}!</h3>
                <button className="logout" onClick={signoutHandler}>Sign out</button>
            </div>
        </header>
    )
}