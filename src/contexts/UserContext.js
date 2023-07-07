import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export const MyUserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState()
    const [userMessages, setUserMessages] = useState()
    const [userAvatar, setUserAvatar] = useState()
    const [isLoggedDummy, setIsLoggedDummy] = useState(false)
    const [userDataChangeDummy, setUserDataChangeDummy] = useState(false)

    return (
        <UserContext.Provider value={{userData, setUserData, userMessages, setUserMessages, userAvatar, setUserAvatar, isLoggedDummy, setIsLoggedDummy, userDataChangeDummy, setUserDataChangeDummy}}>
            {children}
        </UserContext.Provider>
    )
}