import { useEffect, useContext } from 'react'
import axios from 'axios'
import { authorizationConfig } from '../../security'
import { UserContext } from '../../contexts/UserContext'
import { socket } from '../../App'

export const PublicPageValidator = ({ children }) => {

    const { setUserData, setUserMessages, setUserAvatar, isLoggedDummy, userDataChangeDummy, selectedConversation, userMessagesDataDummy, setUserMessagesDataDummy, setUnreadConversations, setUnreadCount } = useContext(UserContext)

    useEffect(() => {
        let userDataRes = {} 
        if (window.localStorage.getItem("token")) {
            (async() => {
                try{
                userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders())
                setUserData(userDataRes.data.userData)
                setUserAvatar(userDataRes.data.userData.avatar_image)
                
                socket.connect()
                socket.emit("id", `${userDataRes.data.userData._id}`)
                socket.on(`inbox_${userDataRes.data.userData._id}`, (res) => {
                    console.log("Los mensajes recibidos son", res)
                    setUserMessages(res.userMessagesData)
                    if (!selectedConversation.current) {
                        console.log("Se selecciona la primera conversación")
                        selectedConversation.current = res.userMessagesData[0]?.conversation._id
                    }
                    
                    const unreadConversations = []
                    let isUnread = false
                    res.userMessagesData.forEach(conversation => {
                        isUnread = false
                        conversation.messages.forEach(m => {
                        if (m.sender !== userDataRes.data.userData?._id && m.read === false) {
                            console.log("se marca una conver como no leída")
                            isUnread = true
                        }})
                        if (isUnread) {
                        unreadConversations.push(conversation)              
                        }
                    })
                    setUnreadCount(unreadConversations.length)
                    console.log("las convers no leidas son", unreadConversations)
                    setUnreadConversations(unreadConversations)
                    setUserMessagesDataDummy(!userMessagesDataDummy)
                });
                } catch(err){
                    console.log("el error es", err)
                    if(err.response?.data.name === "TokenExpiredError") {
                        window.localStorage.removeItem('token')
                    }
                }
            })()
        } else {
            console.log("no se está comprobando nada")
        }

        return () => {
            socket.disconnect()
            socket.off(`inbox_${userDataRes.data?.userData?._id}`)
        }
    }, [isLoggedDummy, userDataChangeDummy])
  
    return (
    <>
    { children }
    </>
  )
}