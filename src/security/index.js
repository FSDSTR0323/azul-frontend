
export const authorizationConfig = {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
    }
}

