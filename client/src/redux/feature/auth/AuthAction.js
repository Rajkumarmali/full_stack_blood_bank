import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../../services/API'

//¸import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Login
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password })
            if (data.success) {
                localStorage.setItem('token', data.token)
                // localStorage.setItem('email', email)
                //toast.success(data.message);
                alert(data.message)
                window.location.replace("/");
            }

            return data;
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
)
//Register
export const userRegister = createAsyncThunk(
    'auth/register',
    async (
        { name, role, email, password, organizationName, hospitalName, webside, address, phone },
        { rejectWithValue }
    ) => {
        try {
            // Perform registration logic here
            const requestData = {
                name,
                role,
                email,
                password,
                organizationName,
                hospitalName,
                webside,
                address,
                phone
            };

            const { data } = await API.post('/auth/register', requestData);
            if (data.success) {
                // toast.success(data.message);
                alert(data.message);
                window.location.replace('/login')
            }
            return data;
        } catch (err) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            } else {
                return rejectWithValue(err.message);
            }
        }
    }
);

// Current User
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async ({ rejectWithValue }) => {
        try {
            const res = await API.get("/auth/current-user");
            if (res.data) {
                return res?.data;
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
