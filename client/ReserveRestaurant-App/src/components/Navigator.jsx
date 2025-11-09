import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = localStorage.getItem('user');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#1a1a2e' }}>
            <div className="container-fluid px-4">
                <Link className="navbar-brand fw-bold fs-4" to="/" style={{ color: '#16c79a' }}>
                    ReserveRestaurant
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`}
                                to="/"
                                style={isActive('/') ? { color: '#16c79a' } : {}}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/about') ? 'active fw-bold' : ''}`}
                                to="/about"
                                style={isActive('/about') ? { color: '#16c79a' } : {}}
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/menu') ? 'active fw-bold' : ''}`}
                                to="/menu"
                                style={isActive('/menu') ? { color: '#16c79a' } : {}}
                            >
                                Menu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link px-3 py-2 rounded-pill"
                                to="/reservation"
                                style={{
                                    backgroundColor: '#16c79a',
                                    color: '#fff',
                                    fontWeight: '600',
                                    marginLeft: '8px',
                                    marginRight: '8px'
                                }}
                            >
                                Book Table
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/contact') ? 'active fw-bold' : ''}`}
                                to="/contact"
                                style={isActive('/contact') ? { color: '#16c79a' } : {}}
                            >
                                Contact
                            </Link>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link btn btn-outline-light px-3 py-1 ms-2"
                                        to="/register"
                                        style={{ borderRadius: '20px' }}
                                    >
                                        Sign Up
                                    </Link>
                                </li>
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
                                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                                    <li><Link className="dropdown-item" to="/UserProfile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/reservations">My Reservations</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navigator;
