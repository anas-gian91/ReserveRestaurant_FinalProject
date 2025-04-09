import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigator from './components/Navigator';
import About from './components/About';
import Login from './components/User_Component/Login';
import Register from './components/User_Component/Register';
import Contact from './components/contactform';

function App() {
  return(
    <Router>
      <Navigator/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/reservation" element={<Reservations/>}/>
      <Route path="/contact" element = {<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<h1>402 Page not found</h1>}/>
      </Routes>
    </Router>
  )
}
export default App;