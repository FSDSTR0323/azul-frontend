import axios from 'axios'

// export const HeaderTokenConfig = () => { 
    
//     return {
//         headers: {
//             Authorization: `Bearer ${window.localStorage.getItem("token")}`
//         }
//     }

//     console.log(config)

//     return config
// } 

export const authorizationConfig = {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
    }
}