import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


/**
 * Hook returns the auth context state.
 */
export const useAuthContext = () => useContext(AuthContext)