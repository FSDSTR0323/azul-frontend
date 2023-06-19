import {React, useEffect, useState } from "react";
 import { Header } from "../header";
import Footer from "../footer";
import { UserData } from "./UserData";

import { Navigate } from "react-router-dom";


export const Profile = () => {


  return (
   
      <>
        <Header />
        <UserData name="p1"/>
        <Footer />
      </>

  )
};





