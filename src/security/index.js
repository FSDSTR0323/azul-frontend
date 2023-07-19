
export const authorizationConfig = {
    getHeaders: () => {
        return {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }
    }
} 


