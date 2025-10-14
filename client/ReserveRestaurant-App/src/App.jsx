import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigator from './components/Navigator';
import About from './components/About';
import Login from './components/User_Component/Login';
import Register from './components/User_Component/Register';
import Contact from './components/contactform';
import CombinedForm from './components/Reservation_Components/ReservationCombined';
import Menu from './components/Menu_Component/mainMenu';
import GuestForm from './components/User_Component/GuestForm';
import VerificationPage from './components/Reservation_Components/ReservationVerificationEmail';
import UserProfile from './components/User_Component/UserProfile';

function App() {
  return(
    <Router>
      <Navigator/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/reservation" element={<CombinedForm/>}/>
      <Route path= "/verification" element={<VerificationPage/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/contact" element = {<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/guest" element={<GuestForm/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/UserProfile" element={<UserProfile/>}/>
      <Route path="*" element={<h1>402 Page not found</h1>}/>
      </Routes>
    </Router>
  )
}
export default App;