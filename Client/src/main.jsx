import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import App from '../src/App';
import Navbar from './Components/Navbar';
import Chat from './Components/Chat';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<App/>}/>
      
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
    {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);

