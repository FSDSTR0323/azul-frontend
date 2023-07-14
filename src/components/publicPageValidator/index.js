import { useEffect, useContext } from 'react'
import axios from 'axios'
import { authorizationConfig } from '../../security'
import { UserContext } from '../../contexts/UserContext'
import { socket } from '../../App'

export const PublicPageValidator = ({ children }) => {

    const { setUserData, setUserMessages, setUserAvatar, isLoggedDummy, userDataChangeDummy } = useContext(UserContext)

    useEffect(() => {
        console.log("Se ejecuta la función del wrapper")
        if (window.localStorage.getItem("token")) {
            (async() => {
                try{
                const userDataRes = await axios.get("http://localhost:5000/getUserData", authorizationConfig.getHeaders())
                console.log("La data con los mensajes es", userDataRes)
                console.log("El carrito cuando el wrapper trae la info es", userDataRes.data.on_cart)
                setUserData(userDataRes.data.userData)
                setUserMessages(userDataRes.data.userMessagesData)
                setUserAvatar(userDataRes.data.userData.avatar_image)
                
                socket.emit("id", `${userDataRes.data.userData._id}`)
                socket.on(`inbox_${userDataRes.data.userData._id}`, (res) => {
                    console.log("la res es !!!!!!!!!!!!!!!", res.inbox)
                    for(const conversation of res.inbox)  {
                        socket.on(`${conversation._id}`, (message) => {

                        })
                    }                
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
        
        }
    }, [isLoggedDummy, userDataChangeDummy])
  
    return (
    <>
    { children }
    </>
  )
}