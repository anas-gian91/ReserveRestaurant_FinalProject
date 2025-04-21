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
                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};


export default Navigator;
