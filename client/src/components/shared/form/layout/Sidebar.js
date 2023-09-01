import React from 'react';
// import { Menus } from './menus/Menus';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import '../../../../style/Layout.css'
const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.auth)
    return (
        <div className='sidebar'>
            <div className='menu'>
                {user?.role === 'organization' && (
                    <>
                        <div className={`menu-item ${location.pathname === '/' && 'active'}`}>
                            <i className="fa-solid fa-warehouse"></i>
                            <Link to='/'>Invantory</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === '/donar' && 'active'}`}>
                            <i className="fa-solid fa-hand-holding-medical"></i>
                            <Link to='/donar'>Doner</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === '/hospital' && 'active'}`}>
                            <i className="fa-solid fa-hospital"></i>
                            <Link to='/hospital'>Hospital</Link>
                        </div>
                    </>
                )}
                {(user?.role === 'hospital' || user?.role === 'doner') && (
                    <div className={`menu-item ${location.pathname === '/organization' && 'active'}`}>
                        <i className="fa-sharp fa-solid fa-building-ngo"></i>
                        <Link to='/organization'>Organization</Link>
                    </div>
                )}
                {user?.role === 'hospital' && (
                    <div className={`menu-item ${location.pathname === '/consumer' && 'active'}`}>
                        <i className="fa-sharp fa-solid fa-building-ngo"></i>
                        <Link to='/consumer'>Consumer</Link>
                    </div>
                )}
                {user?.role === 'doner' && (
                    <div className={`menu-item ${location.pathname === '/donation' && 'active'}`}>
                        <i className="fa-sharp fa-solid fa-building-ngo"></i>
                        <Link to='/donation'>Donation</Link>
                    </div>
                )}



                {user?.role === 'admin' && (
                    <>
                        <div className={`menu-item ${location.pathname === '/doner-list' && 'active'}`}>
                            <i className="fa-solid fa-warehouse"></i>
                            <Link to='/doner-list'>Doner List </Link>
                        </div>
                        <div className={`menu-item ${location.pathname === '/hospital-list' && 'active'}`}>
                            <i className="fa-solid fa-hand-holding-medical"></i>
                            <Link to='/hospital-list'>Hospital List</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === '/org-list' && 'active'}`}>
                            <i className="fa-solid fa-hospital"></i>
                            <Link to='/org-list'>Organisation List</Link>
                        </div>
                    </>
                )}

                {/* {Menus.map((menu) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <div className={`menu-item ${isActive && 'active'}`} key={menu.path}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>
                    );
                })} */}

            </div>
        </div>
    );
}

export default Sidebar;

