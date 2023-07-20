import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/auth.hook"


export default function AuthSuccess() {

    // States
    const navigate = useNavigate()
    const { signout } = useAuthContext()
    // Handlers
    const signoutHandler = () => {
        signout()
        navigate('/')
    }

    return (
        <div className="AuthSuccess">
            <h1>Authenticated Successfully</h1>
            <div className="developer-specs">
                <section className='section-img'>
                    <img src="https://static.vecteezy.com/system/resources/previews/008/040/410/original/school-logo-design-template-free-vector.jpg" alt="learning place img" />
                </section>
                <section className='section-text'>
                    <h3>Name</h3>
                    <p>Hila Pinhas</p>
                </section>
                <section className='section-text'>
                    <h3>Email</h3>
                    <p>hila7054@gmail.com</p>
                </section>
                <section className='section-text'>
                    <h3>Learning at</h3>
                    <p>...</p>
                </section>
                <section className="section-btns">
                    <button onClick={() => navigate('/')}>Go to Home</button>
                    <code>or</code>
                    <button onClick={signoutHandler}>Sign Out</button>
                </section>
            </div>
        </div>
    )
}