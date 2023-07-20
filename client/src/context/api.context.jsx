import { createContext } from 'react'


export const ApiContext = createContext({
    apiCall: async (url, method, body) => null
})


/**
 * Component provides the AuthContext to given children.
 */
export default function ApiContextProvider({ children }) {

    /**
     * Function provides a convenient api calling method.
     */
    const apiCall = async (url, method = 'GET', body) => {
        const res = await fetch(url, {
            headers: {
                "content-type": 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
            method
        })
        const data = await res.json()
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error('Not authorized')
            }
            else throw new Error(data.msg)
        }
        return { status: res.status, data }
    }


    // Context value.
    const context_value = {
        apiCall
    }

    // Wrapping the children components with the StoreContext.Provider and passing the 'value' object to them as a prop.
    return (
        <ApiContext.Provider value={context_value}>
            {children}
        </ApiContext.Provider>
    )
}
