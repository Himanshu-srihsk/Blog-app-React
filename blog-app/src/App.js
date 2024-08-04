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
import Userdashboard from './pages/user-routes/Userdashboard';
import PrivateRoute from "./components/PrivateRoute"
import ProfileInfo from './pages/user-routes/ProfileInfo';

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
      <Route path='/user' element={<PrivateRoute/>}>
        <Route path='dashboard' element={<Userdashboard/>}/>
        <Route path='profileinfo' element={<ProfileInfo/>}/>
      </Route>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
