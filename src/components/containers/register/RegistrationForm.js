import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import BannerBackground from "../../../assets/home-banner-background.png";
import Divider from '@mui/material/Divider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const RegistrationForm = () => {
    const { token, setToken } = useContext(UserContext)
    const [ error, setError ] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    

    const onSubmit = async (formData) =>  {

        setError(false);
        try {
            const res = await axios.post('http://localhost:5000/register', formData)
            setToken(res.data.token)
            console.log(res.data)
            window.localStorage.setItem('token', token)
        } catch(err) {
            console.log(err)
            const mensajeError =  err.response.data.error
            console.log(mensajeError)
            setError(err.response.data.error)
            console.log("El error es", error)
            setTimeout(() => {
                setError("")
                console.log(error)
            }, 3000)
        }
    }


    return (
        <>
            <div className="home-bannerImage-container">
                <img src={BannerBackground} alt="" />
            </div>
            <Box onSubmit={handleSubmit(onSubmit)}
                className="form-box"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className="registration-form-box">
                    <div id="details">
                        <div>
                        <TextField
                            id="outlined-controlled"
                            label="Nombre*"
                            {...register("name")}
                        /> 
                        <TextField
                            id="outlined-controlled"
                            label="Apellido"
                            {...register("surname")}
                        /> 
                        </div>
                        <div>
                            
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="Basic date picker" />
                            {/* </DemoContainer> */}
                        </LocalizationProvider>
                            
                        
                        {/* <TextField
                            id="outlined-controlled"
                            label="Fecha de Nacimiento*"
                            {...register("birthdate")}
                        />   */}
                        <TextField
                            id="outlined-controlled"
                            label="Dirección"
                            {...register("address")}
                        /> 
                        </div>
                        <div>
                        <TextField
                            id="outlined-controlled"
                            label="Email*"
                            {...register("email")}
                        />  
                        <TextField
                            id="outlined-controlled"
                            label="Teléfono"
                            {...register("phone")}
                        /> 
                        </div>
                    </div>
                    <Divider style={{width:'60%', maxWidth:"40rem"}} />
                    <div id="credentials">
                        <TextField
                            id="outlined-controlled"
                            label="Usuario*"
                            {...register("username")}
                        />
                        <TextField
                            id="outlined-controlled"
                            label="Contraseña*"
                            type="password"
                        /> 
                        <TextField
                            id="outlined-controlled"
                            label="Confirmación*"
                            {...register("password")}
                            type="password"
                        />
                    </div>
                </div> 
                
                <button className="secondary-button" id='login-form-box-button'>Registrarse</button>       
                 
                {/* {error && <p>{error}</p>} */}
            </Box>
        </>
    )
}