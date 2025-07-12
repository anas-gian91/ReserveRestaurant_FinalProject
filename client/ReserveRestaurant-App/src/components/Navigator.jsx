import { Link , useNavigate } from 'react-router-dom';

const Navigator = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">ReserveRestaurant</Link>
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/reservation">Reservation</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>

                    {!user ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        </>
                    ) : (
                        <li className="nav-item dropdown">
                         <a
        className="nav-link dropdown-toggle"
        href="#"
        id="userDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        My Account
    </a>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li><Link className="dropdown-item" to="/UserProfile">Profile</Link></li>
        <li><Link className="dropdown-item" to="/reservations">My Reservations</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
    </ul>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};


export default Navigator;
