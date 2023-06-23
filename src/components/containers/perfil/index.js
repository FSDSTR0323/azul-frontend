import {React, useEffect, useState } from "react";
 import { Header } from "../main/header";
import Footer from "../main/footer";
import { UserData } from "./UserData";
import { UploadButtons } from "./UserAvatar"
import { Navigate } from "react-router-dom";


export const Profile = () => {


  return (
   
      <>
        <Header />
        <UploadButtons/>
        <UserData />
        <Footer />
        {!window.localStorage.getItem("token") && <Navigate to='/login'/>}
      </>

  )
};





