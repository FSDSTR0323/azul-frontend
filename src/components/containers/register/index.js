import React from "react";
import { Header } from "../header";
import Footer from "../footer"
import { RegistrationForm } from "./RegistrationForm";


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
        <RegistrationForm />
        <Footer />
    </>
    );
};
