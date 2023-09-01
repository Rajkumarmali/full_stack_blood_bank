import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import API from '../../services/API';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../redux/feature/auth/AuthAction';
const Protected = ({ children }) => {
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await API.get('/auth/current-user')
            if (data?.success) {
                dispatch(getCurrentUser(data));
            }
        } catch (err) {
            localStorage.clear();
            console.log(err)
        }
    }

    useEffect(() => {
        getUser();
    })

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to='/login' />
    }

}

export default Protected;
