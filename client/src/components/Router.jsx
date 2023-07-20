import { Route, Routes, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/auth.hook"
// Configs
import { PROTECTED_URIS } from "../configs/url.config"
// Pages
import Home from "../pages/home"
import Login from '../pages/login'
import SignUp from '../pages/signup'
import Favorites from "../pages/favorites"
import AuthSuccess from "../pages/AuthSuccess"



/**
 * Component renders a page given the current route.
 */
function AppRouter() {

    // States
    const pathname = window.location.pathname
    const navigate = useNavigate()
    const { state } = useAuthContext()

    // Restrict protected pages from unauthenticated users.
    if (PROTECTED_URIS.some(u => pathname.startsWith(u)) && !state.isAuthorized) {
        // Navigate automatically to login page.
        navigate('/login')
    }

    return (
        <main className="body">
            <Routes>
                {/* Auth pages */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/auth-success' element={<AuthSuccess />} />
            </Routes>
        </main>
    )
}

export default AppRouter
