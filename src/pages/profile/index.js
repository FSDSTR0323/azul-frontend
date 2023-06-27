import {React, useEffect, useState } from "react";
 import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { UserData } from "./UserData";

import { Navigate } from "react-router-dom";


export const Profile = () => {


  return (
   
      <>
        <Header />
        <UserData />
        <Footer />
        {!window.localStorage.getItem("token") && <Navigate to='/login'/>}
      </>

  )
};





