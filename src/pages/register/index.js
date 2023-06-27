import React from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer"
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
