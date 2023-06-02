import { createContext, useState } from 'react'

export const UserContext = createContext();

export const MyUserContextProvider = ({ children }) => {

    const [token, setToken] = useState('')

    return (
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}