import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Homepage } from './components/containers/homepage'
import { Register } from './components/containers/register';
import { CardDetail } from './components/containers/carddetail';


import "./App.css";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/carddetail/:cardId' element={<CardDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
