import React from "react";
import BannerBackground from "../../../assets/home-banner-background.png";
import { Header } from "../header";
import Footer from "../footer"
import { RegisterForm } from "./RegisterForm";


const handleSubmit = (e) => {
    e.preventDefault();
};
// const onChange = (e) => {
//   setValues({ ...values, [e.target.name]: e.target.value });
// };
export const Register = () => {
    return (
    <>
        <Header />
        <RegisterForm />
        <Footer />
    </>
    );
};
