import React from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer"
import LoginForm from '../../components/header/LoginForm'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"



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