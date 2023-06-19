import { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { authorizationConfig } from '../../../security';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserData = ({ name }) => {
    
  const [userData, setUserData] = useState("")
  const [formDisabled, setFormDisabled] = useState(true)
  const [ error, setError ] = useState()
  const { control, register, handleSubmit, getValues, reset, formState: { errors } } = useForm();


    useEffect(() => {
        (async() => {
            try{
            const userDataRes = await axios.get("http://localhost:5000/profile", authorizationConfig)
            console.log("La data res es:", userDataRes)
            setUserData(userDataRes)
            reset({
                name: userDataRes.data.name,
                surname: userDataRes.data.surname ,
                birthdate: dayjs(userDataRes.data.birthdate),
                address: userDataRes.data.address,
                email: userDataRes.data.email,
                phone: userDataRes.data.phone,
                username: userDataRes.data.username,
            })
            } catch(error){
                console.log(error)
            }
        })()
    }, [])

    const handleFormBox = () => {
        setFormDisabled(!formDisabled)
    }

    const onSubmit = async (formData) =>  {
        setError(false);
        console.log("Llegamos aquí")
        console.log("la data aactualizada es", formData)
        try {
            const modifiedDataRes = await axios.put('http://localhost:5000/profile', formData, authorizationConfig)
            toast.success(`Has modificado los datos correctamente`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(modifiedDataRes)
            setUserData(modifiedDataRes)
            reset({
                name: modifiedDataRes.data.name,
                surname: modifiedDataRes.data.surname ,
                birthdate: dayjs(modifiedDataRes.data.birthdate),
                address: modifiedDataRes.data.address,
                email: modifiedDataRes.data.email,
                phone: modifiedDataRes.data.phone,
                username: modifiedDataRes.data.username,
            })
            setFormDisabled(!formDisabled)
        }  
        catch(err) {
            setError(err.response.data.error)
            setTimeout(() => {
                setError()
                console.log(error)
            }, 3000)
        }
    }

    if(userData) {
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
                    <div className="profile-form-box">
                        <div id="details">
                            <div id="details-child">
                                <TextField
                                    id="outlined-controlled"
                                    label="Nombre *"
                                    defaultValue={userData.data.name}
                                    disabled={formDisabled}
                                    {...register("name", { required: true })}
                                /> 
                                <TextField
                                    id="outlined-controlled"
                                    label="Apellido"
                                    defaultValue={userData.data.surname}
                                    disabled={formDisabled}                    
                                    {...register("surname")}
                                /> 
                            </div>
                            <div id="details-child"> 
                                <Controller
                                    name="birthdate"
                                    control={control}
                                    render={({ field }) => <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    >
                                    <DatePicker 
                                    label={`Fecha nacimiento *`}
                                    defaultValue={dayjs(userData.data.birthdate)}
                                    disabled={formDisabled}
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
                                {errors.birthdate && <span className="details-error-message">La fecha de nacimiento es requerida</span>}
                                <TextField
                                    id="outlined-controlled"
                                    label="Dirección"
                                    defaultValue={userData.data.address}
                                    disabled={formDisabled}
                                    {...register("address")}
                                /> 
                            </div>
                            <div id="details-child">
                                <TextField
                                    id="outlined-controlled"
                                    label="Email*"
                                    defaultValue={userData.data.email}
                                    disabled={formDisabled}
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
                                    defaultValue={userData.data.phone}
                                    disabled={formDisabled}
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
                                    defaultValue={userData.data.username}
                                    disabled={formDisabled}
                                    {...register("username", { required: true})}
                                />
                            </div>
                            {/* <div id ="credentials-child">
                                <TextField
                                    id="outlined-controlled"
                                    label="Contraseña*"
                                    defaultValue="password"
                                    disabled={formDisabled}
                                    {...register("password", { required: true})}
                                    type="password"
                                />
                                {errors.passwordConfirmation?.type === 'validate' && <span className="details-error-message error-messages">Las contraseñas no coinciden</span>}
                            </div> */}
                            {/* <div id ="credentials-child">
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
                            </div> */}
                        </div>
                        {(errors.email?.type === 'required' || errors.name?.type === 'required' || errors.username?.type === 'required' || errors.password?.type === 'required' || errors.passwordConfirmation?.type === 'required') && <span className='error-messages' style={{ display:'inline-block', textAlign:'center', marginTop: "2rem"}}>Debe rellenar todos los campos obligatorios (*)</span>}
                        {!formDisabled && <button className="secondary-button" id='login-form-box-button'>Aplicar cambios</button>}       
                    </div> 
                </Box>
                {formDisabled && <button className="secondary-button" id='login-form-box-button' style={{margin: "0 auto"}} onClick={handleFormBox}>Modificar</button>}
            </> 
        );
    }
}

