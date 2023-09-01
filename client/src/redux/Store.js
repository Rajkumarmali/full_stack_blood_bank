import { configureStore } from '@reduxjs/toolkit';
import authSlic from './feature/auth/authSlic';


const store = configureStore({
    reducer: {
        auth: authSlic.reducer
    }
})
export default store;