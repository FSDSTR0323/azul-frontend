import React,{useState} from "react";
 import { Header } from "../header";
// import Footer from "../footer";
// import { UserData } from "./UserData";
import axios from 'axios';

// const handleSubmit = (e) => {
//     e.preventDefault();
// };
// const onChange = (e) => {
//   setValues({ ...values, [e.target.name]: e.target.value });
// };
// export const Profile = () => {
//     return (
//     <>
//         <Header />
//         <UserData />
//         <Footer />
//     </>
//     );
// };

export const Profile = () => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    
    const [user,setUser] = useState({});

    async function getUserDataFromDB(){
        const response = await axios.post(
        "http://localhost:5000/myProfile", 
        {}, 
        {headers: {Authorization: `Bearer ${tokenFromLocalStorage}` }}
        );

        console.log('profile 13 | user data from server', response.data);
        setUser(response.data.userDataFromMongoDBQuerry);
    }
    

    return (
      <>
        <Header />

        <div className='center-container'>
  <div className='box-container'>
    <div className='registration-form-box'>
      <div className='box-item'>
        perfil
      </div>
      <div className='box-item' id="details">
        token{tokenFromLocalStorage}
      </div>
      <div className='box-item' id="details-child">
        name:{user.name}
      </div>
      <div className='box-item' id="outlined-controlled">
        Email:{user.email}
      </div>
      <div className='box-item'>
        Encrypted password:{user.password}
      </div>
      <div className='box-item'>
        phone:{user.phone}
      </div>
      <div className='box-item'>
        <button
          onClick={getUserDataFromDB}
          className='secondary-button'
          id='login-form-box-button'
        >
          user data
        </button>
      </div>
    </div>
  </div>
</div>
      </>
    );
};



