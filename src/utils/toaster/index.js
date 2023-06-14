import { ToastContainer } from 'react-toastify';

export const SuccessAlert = () => {
    return (
    <ToastContainer
    style={{display:'absolute', top:'75px'}}
    position="top-right"
    autoClose="5000"
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    )
}  

// <ToastContainer 
// position="top-right"
// autoClose={5000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
// />