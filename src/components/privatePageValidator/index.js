import { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { authorizationConfig } from '../../security'
import { UserContext } from '../../contexts/UserContext'

export const PrivatePageValidator = ({ children }) => {

    const navigate = useNavigate()
    const { setUserData, setUserMessages, setUserAvatar, isLoggedDummy, userDataChangeDummy } = useContext(UserContext)

    useEffect(() => {

        if (window.localStorage.getItem("token")) {
            (async() => {
                try{
                const userDataRes = await axios.get("http://localhost:5000/getUserData", authorizationConfig.getHeaders())
                setUserData(userDataRes.data.userData)
                setUserMessages(userDataRes.data.userMessagesData)
                setUserAvatar(userDataRes.data.userData.avatar_image)
                } catch(err){
                    if(err.response.data.name === "TokenExpiredError") {
                        window.localStorage.removeItem('token')
                    }
                    navigate('/login')
                }
            })()
        } else {
            console.log("no se está comprobando nada")
            navigate('/login')
        }

    }, [isLoggedDummy, userDataChangeDummy])
  
    return (
    <>
    { children }
    </>
  )
}