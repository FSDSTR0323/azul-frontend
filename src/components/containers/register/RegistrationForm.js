import { Controller, useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const RegistrationForm = () => {
    const { token, setToken } = useContext(UserContext)
    const [ error, setError ] = useState()
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    

    const onSubmit = async (formData) =>  {

        setError(false);
        try {
            const res = await axios.post('http://localhost:5000/register', formData)
            setToken(res.data.token)
            console.log(res.data)
            window.localStorage.setItem('token', token)
        } catch(err) {
            console.log("error devuelto del back", err)
            setError(err.response.data.error)
            console.log("error del estado", error)
            setTimeout(() => {
                setError()
                console.log(error)
            }, 3000)
        }
    }


    return (
        <>
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
                        <div id="details-child">
                        <TextField
                            id="outlined-controlled"
                            label="Nombre *"
                            {...register("name",
                            //  {
                            //     required: true
                            // }
                            )}
                        /> 
                        {errors.name && <span className="error-message">El nombre es requerido</span>}
                        <TextField
                            id="outlined-controlled"
                            label="Apellido"
                            {...register("surname")}
                        /> 
                        </div>
                        <div id="details-child"> 
                        <Controller
                            name="birthdate"
                            control={control}
                            render={({ field }) => <LocalizationProvider 
                            dateAdapter={AdapterDayjs}>
                            <DatePicker 
                            label="Fecha de nacimiento *"
                            {...field}
                            slotProps={{
                                textField: {
                                    error:false,
                                },
                            }}
                            />
                            </LocalizationProvider>
                            }
                        />
                        {errors.birthdate && <span className="error-message">La fecha de nacimiento es requerida</span>}
                        <TextField
                            id="outlined-controlled"
                            label="Dirección"
                            {...register("address")}
                        /> 
                        </div>
                        <div id="details-child">
                        <TextField
                            id="outlined-controlled"
                            label="Email*"
                            {...register("email", {
                                // required: {
                                //     value: true,
                                //     message: "El email es requerido",
                                // },
                                // pattern: {
                                //     value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                //     message: "Introduce un email válido"
                                // }
                            })}
                        /> 
                        {console.log(errors)}
                        {errors.email && <span className="error-message">{errors.email.message}</span>} 
                        <TextField
                            id="outlined-controlled"
                            label="Teléfono"
                            {...register("phone")}
                        /> 
                        </div>
                    </div>
                    <Divider style={{width:'60%', maxWidth:"40rem"}} />
                    <div id="credentials">
                        <div id ="credentials-child">
                            <TextField
                                id="outlined-controlled"
                                label="Usuario*"
                                {...register("username")}
                            />
                        </div>
                        <div id ="credentials-child">
                            <TextField
                                id="outlined-controlled"
                                label="Contraseña*"
                                type="password"
                            />
                        </div>
                        <div id ="credentials-child">
                            <TextField
                                id="outlined-controlled"
                                label="Confirmación*"
                                {...register("password")}
                                type="password"
                            />
                        </div>
                    </div>
                </div> 
                <button className="secondary-button" id='login-form-box-button'>Registrarse</button>       
            </Box>
            {error && <p style={{textAlign: "center", position: "relative"}}>{error}</p>}
        </>
    )
}