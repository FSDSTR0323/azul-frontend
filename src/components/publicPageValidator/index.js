import { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { authorizationConfig } from '../../security'
import { UserContext } from '../../contexts/UserContext'

export const PublicPageValidator = ({ children }) => {

    const navigate = useNavigate()
    const {userData, setUserData, userAvatar, setUserAvatar, isLoggedDummy, userDataChangeDummy } = useContext(UserContext)

    useEffect(() => {
        console.log("Se ejecuta la función del wrapper")
        if (window.localStorage.getItem("token")) {
            (async() => {
                try{
                const userDataRes = await axios.get("http://localhost:5000/getUserData", authorizationConfig.getHeaders())
                console.log("El carrito cuando el wrapper trae la info es", userDataRes.data.on_cart)
                setUserData(userDataRes.data)
                setUserAvatar(userDataRes.data.avatar_image)
                } catch(err){
                    if(err.response.data.name === "TokenExpiredError") {
                        window.localStorage.removeItem('token')
                    }
                }
            })()
        } else {
            console.log("no se está comprobando nada")
        }
    }, [isLoggedDummy, userDataChangeDummy])
  
    return (
    <>
    { children }
    </>
  )
}