import React from "react";
import { Header } from "../main/header";
import Footer from "../main/footer"
import LoginForm from '../main/header/LoginForm'
import { Navigate } from "react-router-dom";


export const Login = () => {

    return (
    <>
        <Header />
        <LoginForm handleClose=""/>
        <Footer />
        {window.localStorage.getItem("token") && <Navigate to='/'/>}
    </>
    );
};