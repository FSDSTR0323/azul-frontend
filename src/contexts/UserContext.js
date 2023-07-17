import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export const MyUserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState()
    const [userAvatar, setUserAvatar] = useState()

    const [userMessages, setUserMessages] = useState()
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadConversations, setUnreadConversations] = useState([])

    const [isLoggedDummy, setIsLoggedDummy] = useState(false)
    const [userDataChangeDummy, setUserDataChangeDummy] = useState(false)

    return (
        <UserContext.Provider value={{userData, setUserData, userMessages, setUserMessages, userAvatar, setUserAvatar, unreadConversations, setUnreadConversations, unreadCount, setUnreadCount, isLoggedDummy, setIsLoggedDummy, userDataChangeDummy, setUserDataChangeDummy}}>
            {children}
        </UserContext.Provider>
    )
}