import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isValid } } = useForm();
    const [ error, setError ] = useState('')
    
    const onSubmit = async (formData) =>  {
        try {
            const res = await axios.post('http://localhost:5000/login', formData)
            console.log("el token es", res.data.token)
            console.log("el mensaje es", res.data.message)
            window.localStorage.setItem('token', res.data.token)
            navigate('/profile', { replace: true });
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
                id="user-credential"
                label="Usuario/email"
                // onChange={updateSubmitBtn}
                {...register("userCredential", {required: true})}
            />      
            <TextField
                id="outlined-controlled"
                label="Contraseña"
                type='password'
                {...register("password", {required: true})}
            />

            {error && <p className='error-messages' style={{ textAlign:'center'}}>{error}</p>}
            <button className="secondary-button" id='login-form-box-button' disabled={!isValid}>Conectarse</button>
        </Box>
    );
}