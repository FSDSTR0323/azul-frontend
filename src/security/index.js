import axios from 'axios'


export const authorizationConfig = {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
    }
}

export const tokenValidator = () => {
    
}