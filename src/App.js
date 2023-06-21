import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Homepage } from './components/containers/homepage'
import { Register } from './components/containers/register';
import { CardDetail } from './components/containers/cardDetail';
import { SuccessAlert } from './utils/toaster';
import { Profile } from './components/containers/perfil';
import { Login } from './components/containers/login'

import "./App.css";

function App() {
  
  return (
    <div className="App">
      <SuccessAlert />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/carddetail/:cardId' element={<CardDetail />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
