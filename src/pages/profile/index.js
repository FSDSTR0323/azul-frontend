import {React} from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { UserData } from "./UserData";
import { PrivatePageValidator } from "../../components/privatePageValidator";

export const Profile = () => {

  return (
      <PrivatePageValidator>
          <Header />
          <UserData />
          <Footer />
      </PrivatePageValidator>
  )
};





