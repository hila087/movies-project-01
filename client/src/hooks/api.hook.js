import { useContext } from "react"
import { ApiContext } from "../context/api.context"


/**
 * Hook returns the API context state.
 */
export const useApiContext = () => useContext(ApiContext)