import React from "react";
import { Header } from "../main/header";
import Footer from "../main/footer"
import LoginForm from '../main/header/LoginForm'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext"



export const Login = () => {
    const {setUserAvatar} = React.useContext(UserContext)

    return (
    <>
        <Header />
        <LoginForm handleClose="" setUserAvatar={setUserAvatar}/>
        <Footer />
        {window.localStorage.getItem("token") && <Navigate to='/'/>}
    </>
    );
};