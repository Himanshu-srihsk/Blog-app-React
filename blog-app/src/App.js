import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from './pages/services';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
