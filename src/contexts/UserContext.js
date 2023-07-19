import { createContext, useRef, useState } from 'react'

export const UserContext = createContext();

export const MyUserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState()
    const [userAvatar, setUserAvatar] = useState()

    const [userMessages, setUserMessages] = useState()
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadConversations, setUnreadConversations] = useState([])
    const selectedConversation = useRef("")

    const [isLoggedDummy, setIsLoggedDummy] = useState(false)
    const [userDataChangeDummy, setUserDataChangeDummy] = useState(false)
    const [userMessagesDataDummy, setUserMessagesDataDummy] = useState(false)

    const value = {
        userData, 
        setUserData, 
        userMessages, 
        setUserMessages, 
        userAvatar, 
        setUserAvatar, 
        unreadConversations, 
        setUnreadConversations, 
        selectedConversation, 
        unreadCount, 
        setUnreadCount, 
        isLoggedDummy, 
        setIsLoggedDummy, 
        userDataChangeDummy, 
        setUserDataChangeDummy, 
        userMessagesDataDummy, 
        setUserMessagesDataDummy
        }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}