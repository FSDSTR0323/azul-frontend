import { Controller, useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";


export const RegistrationForm = () => {
    const [ error, setError ] = useState()
    const { control, register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSubmit = async (formData) =>  {
        setError(false);
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, formData)
            window.localStorage.setItem('token', res.data.token)
            toast.success(`Te has registrado correctamente. ¡Bienvenido a FreakyWorld!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch(err) {
            setError(err.response.data.error)
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
                            {...register("name", { required: true })}
                        /> 
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
                            rules={{
                                required: true,
                            }}
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
                                required: true,
                                pattern: {
                                    value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                    message: "Introduzca un email válido"
                                }
                            })}
                        /> 
                        {errors.email?.type === 'pattern' && <span className="details-error-message error-messages">{errors.email.message}</span>} 
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
                                {...register("username", { required: true})}
                            />
                        </div>
                        <div id ="credentials-child">
                            <TextField
                                id="outlined-controlled"
                                label="Contraseña*"
                                {...register("password", { required: true})}
                                type="password"
                            />
                            {errors.passwordConfirmation?.type === 'validate' && <span className="details-error-message error-messages">Las contraseñas no coinciden</span>}
                        </div>
                        <div id ="credentials-child">
                            <TextField
                                id="outlined-controlled"
                                label="Confirmación*"
                                {...register("passwordConfirmation", { 
                                    required: true,
                                    validate: value => value === getValues('password')
                                    }
                                )}
                                type="password"
                            />
                        </div>
                    </div>
                </div> 
                {(errors.email?.type === 'required' || errors.name?.type === 'required' || errors.birthdate?.type === 'required' ||errors.username?.type === 'required' || errors.password?.type === 'required' || errors.passwordConfirmation?.type === 'required') && <span className='error-messages' style={{ display:'inline-block', textAlign:'center', marginTop: "2rem"}}>Debe rellenar todos los campos obligatorios (*)</span>}
                <button className="secondary-button" id='login-form-box-button'>Registrarse</button>       
            </Box>
            {error && <p className='error-messages' style={{textAlign: "center", position: "relative"}}>{error}</p>}
            {window.localStorage.getItem("token") && <Navigate to='/'/>}
        </>
    )
}