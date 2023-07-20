import { createContext, useReducer, useEffect } from 'react'
import { GET_SERVER_URL } from '../configs/url.config'
import { useApiContext } from '../hooks/api.hook'


const initState = {
    user: null,
    isLoading: true,
    isAuthorized: null
}


export const AuthContext = createContext({
    state: initState,
    signout: () => null,
    login: async (email, password) => null,
    signup: async (fname, sname, age, email, password) => null,
    dispatch: ({ type, payload }) => null
})

/**
 * Auth reducer function to handle app-level auth operations.
 */
export const authReducer = (state, action) => {
    console.log({action});
    switch (action.type) {
        // Auth operatoins
        case "LOGIN":
        case "SIGNUP":
            return { ...state, user: action.payload, isLoading: false, isAuthorized: true }
        case "UNAUTHORIZED":
            return { ...state, isLoading: false, isAuthorized: false  }
        case "SIGNOUT":
            return { ...state, user: null, isAuthorized: false }
        // Data operations
        case "UPDATE_USER":
            return { ...state, user: action.payload(state.user) }
        case "ADD_ITEM":
            return { ...state, user: { ...state.user, items: [ ...state.user.items, action.payload ] } }
        case "REMOVE_ITEM":
            return { ...state, user: { 
                ...state.user, 
                items: state.user.items.filter(({ _id }) => action.payload !== _id),
                items_in_cart: state.user.items_in_cart.filter(_id => action.payload !== _id) 
            }}
        case "ITEM_CART_TOGGLE":
            if (state.user.items_in_cart.some(i => i === action.payload)) return { ...state, user: { 
                ...state.user, 
                items_in_cart: state.user.items_in_cart.filter(_id => action.payload !== _id) 
            }}
            else return { ...state, user: { 
                ...state.user, items_in_cart: [ ...state.user.items_in_cart, action.payload ] 
            }}
        default:
            return state
    }
}

/**
 * Component provides the AuthContext to given children.
 */
export default function AuthContextProvider({ children }) {

    // States
    const { apiCall } = useApiContext()
    const [state, dispatch] = useReducer(authReducer, initState)

    // Function loads user data.
    const loadUser = async () => {
        try {
            const res = await apiCall(GET_SERVER_URL('user'), 'GET')
            // Dispatch user data to local state.
            dispatch({ type: "LOGIN", payload: res.data.data })
        }
        catch (err) {
            dispatch({ type: "UNAUTHORIZED" })
        }
    }
    
    // Function resets the auth token cookie.
    const signout = () => {
        document.cookie = `x-auth-token=; expires;Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        dispatch({ type: 'SIGNOUT' })
    }
    
    // Function makes a login call
    const login = async (email, password) => {
        const res = await apiCall(GET_SERVER_URL('user/login'), 'POST', { email, password })
        dispatch({ type: "LOGIN", payload: res.data.data })
        return res
    }

    // Function makes a signup call
    const signup = async (fname, sname, age, email, password) => {
        const res = await apiCall(GET_SERVER_URL('user/sign-up'), 'POST', { fname, sname, age, email, password })
        dispatch({ type: "SIGNUP", payload: res.data.data })
        return res
    }


    // Make initial request for user data.
    useEffect(() => {
        loadUser()
    }, [])

    // Context value (state and methods)
    const context_value = {
        state,
        signout,
        login,
        signup,
        dispatch
    }

    // Wrapping the children components with the StoreContext.Provider and passing the 'value' object to them as a prop.
    return (
        <AuthContext.Provider value={context_value}>
            {children}
        </AuthContext.Provider>
    )
}
