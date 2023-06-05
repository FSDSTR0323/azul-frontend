import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';


export default function LoginForm() {
    const { token, setToken } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState('')
    const onSubmit = async (formData, e) =>  {
        try {
            const res = await axios.post('http://localhost:5000/login', formData)
            setToken(res.data.token)
            console.log("el token es", token)
            window.localStorage.setItem('token', token)
        } catch(err) {
            console.log("este es el error", err.response.data.error)
            setError(err.response.data.error)
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }

    const stopPropagationForTab = (event) => {
        if (event.key === "Tab") {
            event.stopPropagation();
        }
    }

    return (
    // <form onSubmit={handleSubmit(onSubmit)}>
        <Box onSubmit={handleSubmit(onSubmit)}
            className="login-form-box"
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onKeyDown={stopPropagationForTab}
        >
            <label>Iniciar sesión</label>
            <TextField
                id="outlined-controlled"
                label="Usuario/email"
                {...register("userCredential")}
            />      
            <TextField
                id="outlined-controlled"
                label="Contraseña"
                type='password'
                {...register("password")}
            />
            {error && <p>{error}</p>}
            <button className="secondary-button" id='login-form-box-button' href={'/register'}>Conectarse</button>
        </Box>
    // </form>
    );
}