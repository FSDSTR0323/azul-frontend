import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState('')
    const onSubmit = async (formData, e) =>  {

        try {
            const res = await axios.post('http://localhost:5000/login', formData)
            console.log("esta es la respuesta", res)
        } catch(err) {
            console.log("este es el error", err.response.data.error)
            setError(err.response.data.error)
            setTimeout(() => {
                setError('')
            }, 3000)
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
        >
            <label>Iniciar sesión</label>
            <TextField
                id="outlined-controlled"
                label="Usuario/email"
                {...register("userCredential")}
            />      
            <TextField
                id="outlined-controlled"
                label="Password"
                {...register("password")}
            />
            {error && <p>{error}</p>}
            <button className='secondary-button'>Conectarse</button>
        </Box>
    // </form>
  );
}