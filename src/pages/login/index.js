import React from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer"
import LoginForm from '../../components/header/LoginForm'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"



export const Login = () => {
    const {userData, setUserData, isLoggedDummy, setIsLoggedDummy} = React.useContext(UserContext)

    return (
    <>
        <Header />
        <LoginForm handleClose="" userData={userData} setUserData={setUserData} isLoggedDummy={isLoggedDummy} setIsLoggedDummy={setIsLoggedDummy}/>
        <Footer />
        {window.localStorage.getItem("token") && <Navigate to='/'/>}
    </>
    );
};