import { BrowserRouter, useNavigate } from 'react-router-dom'
// Context providers
import ApiContextProvider from './context/api.context'
import AuthContextProvider from './context/auth.context'
// Components
import AppRouter from './components/Router'
import Header from './components/Header'
// Styles
import './styles/index.css'


export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ApiContextProvider>
          <AuthContextProvider>

            {/* Navigation bar */}
            <Header />
            {/* render router for pages */}
            <AppRouter />

          </AuthContextProvider>
        </ApiContextProvider>
      </BrowserRouter>
    </div>
  )
}