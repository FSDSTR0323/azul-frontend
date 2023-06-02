import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Divider from '@mui/material/Divider';

export const RegisterForm = () => {
    const { token, setToken } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState('')

    const onSubmit = async (formData, e) =>  {
        try {
            const res = await axios.post('http://localhost:5000/register', formData)
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
    return (
        <Box onSubmit={handleSubmit(onSubmit)}
            className="form-box"
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className="register-form-box">
            <div>
            <label>Nombre</label>
            <TextField
                id="outlined-controlled"
                label="Nombre"
                {...register("userCredential")}
            /> 
            </div>
            <div>
            <label>Apellido</label>     
            <TextField
                id="outlined-controlled"
                label="Apellido"
                {...register("password")}
            />
            </div>
            <div>
            <label>Fecha de Nacimiento</label>
            <TextField
                id="outlined-controlled"
                label="Fecha de Nacimiento"
                {...register("userCredential")}
            />   
            </div>
            <div>   
            <label>Dirección</label>
            <TextField
                id="outlined-controlled"
                label="Dirección"
                {...register("userCredential")}
            />   
            </div>
            <div>
            <label>Email</label>
            <TextField
                id="outlined-controlled"
                label="Email"
                {...register("userCredential")}
            /> 
            </div>
            <div>
            <label>Teléfono</label>
            <TextField
                id="outlined-controlled"
                label="Teléfono"
                {...register("userCredential")}
            /> 
            </div> 
            <div>
            <label>Usuario</label>
            <TextField
                id="outlined-controlled"
                label="Usuario"
                {...register("userCredential")}
            />
            </div>
            <div> 
            <label>Contraseña</label>
            <TextField
                id="outlined-controlled"
                label="Contraseña"
                {...register("userCredential")}
            /> 
            </div>  
            <div>
            <label>Repite contraseña</label>
            <TextField
                id="outlined-controlled"
                label="Repite contraseña"
                {...register("userCredential")}
            />
            </div> 
            </div>               
            {error && <p>{error}</p>}
            <div>
            <button className="secondary-button" id='login-form-box-button'>Conectarse</button>
            </div>
        </Box>
    )

}

//     return (
// <div className="home-bannerImage-container">
//           <img src={BannerBackground} alt="" />
//         </div>
//     {/* --------------------- */}
//       <div className='All'>
//       <form >
//         <divi className = 'registro'><h1 className="go"> Registrate</h1></divi>
//         <div className='Grupo0'>
//         <div className='Grupo1'>
//         <div className='Nombre'>
//           <input
//             type='text'
//             name='nombre'
//             id='nombre'
//             // value={name}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='name'>Nombre:</label>
//         </div>
//         <div className='apellido'>
//           <input
//             type='text'
//             name='apellido'
//             id='nombre'
//             // value={password}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='password'>apellido</label>
//         </div>
//         <div className='fechaDeNacimiento'>
//           <input
//             type='texto'
//             name='fechadenacimeinto'
//             id='3'
//             // value={password}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='password'>fecha de nacimiento :</label>
//         </div>
//         </div>
//         {/* ------------------------------------------------------ */}
//         <div className='Grupo2'>
//         <div className='Contraseña'>
//           <input
//             type='password'
//             name='password'
//             id='password'
//             // value={password}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='password'>Contraseña:</label>
//         </div>
//         <div className='Email'>
//           <input
//             type='email'
//             name='email'
//             id='email'
//             // value={email}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='email'>Email:</label>
//         </div>
//         <div className='numero'>
//           <input
//             type='number'
//             name='numero'
//             id='numero'
//             // value={password}
//             // onChange={onInputChange}
//             required
//             autoComplete='off'
//           />
//           <label htmlFor='password'>numero:</label>
//         </div>
//         </div>
//     </div>
//         <button className="orange">Enviar</button>
//         </form >
//     </div>

//     )
// }