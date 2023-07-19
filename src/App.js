import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { Register } from './pages/register';
import { CardDetail } from './pages/cardDetail';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { Messages } from './pages/messages';
import { SuccessAlert } from './utils/toaster';
import { MyUserContextProvider } from './contexts/UserContext'
import { MyCardContextProvider } from './contexts/CardContext'; 
import axios from 'axios';
import { io } from 'socket.io-client'
import "./App.css";
import { CartShop } from './pages/cartshop';
import { useEffect } from 'react';

export const socket = io(`${process.env.REACT_APP_BASE_URL}`)


function App() {
  
  return (
    <div className="App">
      <SuccessAlert />
      <MyUserContextProvider>
        <MyCardContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Homepage />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/carddetail/:cardId' element={<CardDetail />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/cartshop' element={<CartShop />}></Route>
              <Route path='/messages' element={<Messages />}></Route>
            </Routes>
          </BrowserRouter>
          </MyCardContextProvider>
      </MyUserContextProvider>
    </div>
  );
  
}

export default App;
