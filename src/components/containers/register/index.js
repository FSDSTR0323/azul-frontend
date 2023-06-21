import React from "react";
import { Header } from "../main/header";
import Footer from "../main/footer"
import { RegistrationForm } from "./RegistrationForm";

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
