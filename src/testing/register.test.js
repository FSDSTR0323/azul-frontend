import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Register from '../components/containers/register'
import { RegistrationForm } from "../components/containers/register/RegistrationForm";


test('load and display resgister form', () => {

    render(<RegistrationForm/>)
    expect(screen.getByRole('button')).toHaveTextContent('Registrarse')

    const fieldsToTest = ["Nombre", "Fecha de nacimiento", "Email", "Apellido", "Dirección", "Teléfono", "Usuario", "Contraseña", "Confirmación"]    
    fieldsToTest.forEach(e => expect(screen.queryByText(e)).toBeNull())

})

