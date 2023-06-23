import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export const MyUserContextProvider = ({ children }) => {

    // const [userIsLogged, setUserIsLogged] = useState()
    const [userAvatar, setUserAvatar] = useState()

    // useEffect(() => {
    //     const token = window.localStorage.getItem("token") || null
    //     if (token) {

    //     }
    // })

    return (
        <UserContext.Provider value={{userAvatar, setUserAvatar}}>
            {children}
        </UserContext.Provider>
    )
}