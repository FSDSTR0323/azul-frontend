import { useState, useEffect, useContext } from 'react';
import { Controller, useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UploadButtons } from "./UserAvatar";
import { UserContext } from "../../contexts/UserContext"

export const UserData = ({ name }) => {
    
    const navigate = useNavigate

    const [file, setFile] = useState();
    // const [userAvatar, setUserAvatar ] = useState()
    const {userData, setUserData, userAvatar, setUserAvatar, setUserDataChangeDummy, userDataChangeDummy } = useContext(UserContext)
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm()
    const [ error, setError ] = useState()
    const [formDisabled, setFormDisabled] = useState(true)

    const { register: oldPsswdRegister, handleSubmit: oldPsswdHandleSubmit, formState: { errors: oldPsswdErrors } } = useForm()
    const { register: psswdRegister, handleSubmit: psswdHandleSubmit, getValues, formState: { errors: psswdErrors } } = useForm()
    const [ psswdError, setPsswdError ] = useState()
    const [ psswdFormDisabled, setPsswdFormDisabled] = useState(true)
    const [ isPsswdCorrect, setIsPsswdCorrect] = useState(false)

    console.log("La data antes de renderizar el perfil de user es", userData)
    useEffect(() => {
        (async() => {
            console.log("dataaaa",userData)
            try{
            setUserAvatar(userData.avatar_image)
            reset({
                name: userData.name,
                surname: userData.surname ,
                birthdate: dayjs(userData.birthdate),
                address: userData.address,
                email: userData.email,
                phone: userData.phone,
                avatar_image: userData.avatar_image,
                username: userData.username,
            })
            } catch(err){
                console.log(err)
                // if(err.response.data?.name === "TokenExpiredError") {
                //     window.localStorage.removeItem('token')
                //     navigate('/login')
                // }
            }
        })()
    }, [userData])

    const handleFormBox = () => {
        setFormDisabled(!formDisabled)
        console.log()
    }

    const handleFileUpload = async (formData) => {
        const image = file[0] 
        
        const imageData = new FormData()
        imageData.append("file", image)
        imageData.append("upload_preset", "nuclio-fw")
        imageData.append("cloud_name", "freakyworld")
    
        const mediaType = image.type.split("/")[0]

        try {
            const imageRes = await axios.post(`https://api.cloudinary.com/v1_1/freakyworld/${mediaType}/upload`, imageData)
            formData.avatar_image = imageRes.data.url
        } catch(err) {
            console.log("Este es el error al postear img a cloudinary", err)
        }
    }

    const onSubmit = async (formData) =>  {
        setError();

        if(typeof formData.avatar_image !== "string") {
            await handleFileUpload(formData)
        }

        console.log("form data es:", formData)
        
        try {
            const modifiedDataRes = await axios.put(`${process.env.REACT_APP_BASE_URL}/profile/modify_details`, formData, authorizationConfig.getHeaders())
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
            setUserAvatar(modifiedDataRes.data.avatar_image)
            setUserDataChangeDummy(!userDataChangeDummy)
            reset({
                name: modifiedDataRes.data.name,
                surname: modifiedDataRes.data.surname ,
                birthdate: dayjs(modifiedDataRes.data.birthdate),
                address: modifiedDataRes.data.address,
                email: modifiedDataRes.data.email,
                phone: modifiedDataRes.data.phone,
                avatar_image: modifiedDataRes.data.avatar_image,
                username: modifiedDataRes.data.username,
            })
            setFormDisabled(!formDisabled)
        }  
        catch(err) {
            if(err.response.data?.name === "TokenExpiredError") {
                window.localStorage.removeItem('token')
                navigate('/login')
            }
            setError({ detailsError: err.response.data.error})
            setTimeout(() => {
                setError()
                console.log(error)
            }, 3000)
        }
    }


    const handlePsswdFormBox = () => {
        setPsswdFormDisabled(!formDisabled)
    }
    
    const onSubmitOldPsswd = async (oldPsswd) => {
        setPsswdError()
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/profile/check_psswd`, oldPsswd, authorizationConfig.getHeaders())
            setIsPsswdCorrect(true)
            console.log(res)
        } catch (err) {
            console.log(err)
            if(err.response.data.name === "TokenExpiredError") {
                window.localStorage.removeItem('token')
                navigate('/login')
            }
            setError({ oldPsswdError: err.response.data.error})
            setTimeout(() => {
                setError()
                console.log(error)
            }, 3000)
        }
    }

    const onSubmitPsswd = async (newPsswd) => {
        setPsswdError()
        console.log(newPsswd)
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/profile/modify_psswd`, newPsswd, authorizationConfig.getHeaders())
            console.log(res)
            setIsPsswdCorrect(!isPsswdCorrect)
            setPsswdFormDisabled(!psswdFormDisabled)
            toast.success(`Has modificado la contraseña correctamente`, {
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
            console.log(err)
            if(err.response.data.name === "TokenExpiredError") {
                window.localStorage.removeItem('token')
                navigate('/login')
            }
            setError(err.response.data.error)
            setTimeout(() => {
                setError()
                console.log(error)
            }, 3000)
        }
    }

    

    if(userAvatar) {
        return (
            <div style={{marginTop: "6rem"}}>
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
                            <UploadButtons register={register} formDisabled={formDisabled} setFile={setFile} userAvatar={userAvatar}/>
                        </div>
                        <div id="details">
                            <div id="details-child">
                                <TextField
                                    id="outlined-controlled"
                                    label="Nombre *"
                                    defaultValue={userData.name}
                                    disabled={formDisabled}
                                    {...register("name", { required: true })}
                                /> 
                                <TextField
                                    id="outlined-controlled"
                                    label="Apellido"
                                    defaultValue={userData.surname}
                                    disabled={formDisabled}                    
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
                                    dateAdapter={AdapterDayjs}
                                    >
                                    <DatePicker 
                                    label='Fecha nacimiento *'
                                    defaultValue={dayjs(userData.birthdate)}
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
                                <TextField
                                    id="outlined-controlled"
                                    label="Dirección"
                                    defaultValue={userData.address}
                                    disabled={formDisabled}
                                    {...register("address")}
                                /> 
                            </div>
                            <div id="details-child">
                                <TextField
                                    id="outlined-controlled"
                                    label="Email*"
                                    defaultValue={userData.email}
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
                                    defaultValue={userData.phone}
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
                                    defaultValue={userData.username}
                                    disabled={formDisabled}
                                    {...register("username", { required: true})}
                                />
                            </div>
                        </div>
                        {console.log("el error es", errors)}
                        {(errors.email?.type === 'required' || errors.name?.type === 'required' || errors.birthdate?.type === 'required' || errors.username?.type === 'required' || errors.password?.type === 'required' || errors.passwordConfirmation?.type === 'required') && <span className='error-messages' style={{ display:'inline-block', textAlign:'center', marginTop: "2rem"}}>Debe rellenar todos los campos obligatorios (*)</span>}
                        {error?.detailsError && <span className="profile-error-message error-messages">{error.detailsError}</span>}
                        {!formDisabled && <button className="secondary-button" id='login-form-box-button'>Aplicar cambios</button>}       
                    </div> 
                </Box>
                
                {formDisabled && <button className="secondary-button" id='login-form-box-button' style={{margin: "0 auto 2rem auto"}} onClick={handleFormBox}>Modificar</button>}
                
                {!psswdFormDisabled && !isPsswdCorrect &&
                    <>
                        <Divider  style={{width: "40vw", margin: "0 auto 2rem auto"}}/> 
                        <Box onSubmit={oldPsswdHandleSubmit(onSubmitOldPsswd)}
                            className="form-box"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off">
                                <div id="credentials">
                                <div id ="credentials-child">
                                    <TextField
                                        id="outlined-controlled"
                                        label="Contraseña antigua*"
                                        {...oldPsswdRegister("oldPassword", { required: true})}
                                        type="password"
                                    />
                                </div>
                                {error?.oldPsswdError && <span className="credentials-error-message error-messages">{error.oldPsswdError}</span>}
                                {oldPsswdErrors.oldPassword?.type === 'required' && <span className="credentials-error-message error-messages">Debe rellenar todos los campos obligatorios (*)</span>}

                                </div>
                                <button className="secondary-button" id='login-form-box-button' style={{marginTop: "21px"}}>Siguiente</button>
                        </Box>
                    </>
                }
                {isPsswdCorrect &&
                    <>
                        <Divider  style={{width: "40vw", margin: "0 auto 2rem auto"}}/> 
                        <Box onSubmit={psswdHandleSubmit(onSubmitPsswd)}
                            className="form-box"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off">
                                <div id="credentials">
                                    <div id ="credentials-child">
                                        <TextField
                                            id="outlined-controlled"
                                            label="Nueva Contraseña*"
                                            {...psswdRegister("newPassword", { required: true})}
                                            type="password"
                                        />
                                        {psswdErrors.passwordConfirmation?.type === 'validate' && <span className="details-error-message error-messages">Las contraseñas no coinciden</span>}
                                    </div>
                                    <div id ="credentials-child">
                                        <TextField
                                            id="outlined-controlled"
                                            label="Confirmación*"
                                            {...psswdRegister("passwordConfirmation", { 
                                                required: true,
                                                validate: value => value === getValues('newPassword')
                                                }
                                            )}
                                            type="password"
                                        />
                                    </div>
                                </div>
                               {(psswdErrors.newPassword?.type === 'required' || errors.passwordConfirmation?.type === 'required') && <span className='error-messages' style={{ display:'inline-block', textAlign:'center', marginTop: "2rem"}}>Debe rellenar todos los campos obligatorios (*)</span>}
                                <button className="secondary-button" id='login-form-box-button' style={{marginTop: "21px"}}>Aplicar cambio</button>
                        </Box>
                    </>
                }
                {psswdFormDisabled && <button className="secondary-button" id='login-form-box-button' style={{margin: "0 auto"}} onClick={handlePsswdFormBox}>Modificar contraseña</button>}
            </div> 
        );
    }
}

