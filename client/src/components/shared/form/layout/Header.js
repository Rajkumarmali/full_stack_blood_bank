import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi'
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from 'react-router-dom';
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const locationi = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        alert("Logout Successful");
        navigate('/login');
    }
    return (
        <>
            <nav className='navbar'>
                <div className='container-fluid'>
                    <div className='navbar-brand h1'><BiDonateBlood color='red' />Blood Bank</div>
                    <ul className='navbar-nav flex-row'>
                        <li className='nav-item'>
                            <p className='nav-link mx-3'>
                                <BiUserCircle />  Welcome {user?.name || user?.hospitalName || user?.organizationName} &nbsp;
                                <span className="badge bg-secondary">{user?.role}</span>
                            </p>
                        </li>
                        {(locationi.pathname === '/' || locationi.pathname === '/donar' || locationi.pathname === '/hospital') ? (
                            <li className='nav-item'>
                                <Link to='/analytics' className='nav-link mx-3'>Analytics</Link>
                            </li>
                        ) : (
                            <li className='nav-item'>
                                <Link to='/' className='nav-link mx-3'>Home</Link>
                            </li>)
                        }
                        <li className='nav-item mx-3'>
                            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    );
}

export default Header;
