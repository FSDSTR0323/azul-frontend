import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { Register } from './pages/register';
import { CardDetail } from './pages/cardDetail';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { SuccessAlert } from './utils/toaster';
import { MyUserContextProvider } from './contexts/UserContext'

import "./App.css";
import { CartShop } from './pages/cartshop';

function App() {
  
  return (
    <div className="App">
      <SuccessAlert />
      <MyUserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/carddetail/:cardId' element={<CardDetail />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cartshop' element={<CartShop />}></Route>
        </Routes>
      </BrowserRouter>
      </MyUserContextProvider>
    </div>
  );
}

export default App;
