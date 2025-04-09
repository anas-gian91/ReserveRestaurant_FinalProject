import {Link} from 'react-router-dom';

const Navigator = () => {
    return (
        <div className="navbar">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to ="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
        </div>
    );
};

export default Navigator;