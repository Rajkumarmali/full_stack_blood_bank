import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, userLogin, userRegister } from './AuthAction';


const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;


const initialState = {
    loadning: false,
    user: null,
    token,
    error: null
}

const authSlic = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login
        builder.addCase(userLogin.pending, (state) => {
            state.loadning = true;
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loadning = false;
            state.user = payload.user;
            state.token = payload.token
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loadning = false;
            state.err = payload;
        })

        // Register 
        builder.addCase(userRegister.pending, (state) => {
            state.loadning = true;
            state.error = null
        })
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loadning = false;
            state.user = payload.user;

        })
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loadning = false;
            state.err = payload;
        })

        // Current User
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loadning = true;
            state.error = null
        })
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loadning = false;
            state.user = payload.user;

        })
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loadning = false;
            state.err = payload;
        })


    },
});
export default authSlic;