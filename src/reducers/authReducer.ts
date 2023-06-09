import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthCustomer, ICustomer, ICustomerData } from '../Interfaces/LoginInterface';

interface CounterState {
    user            : ICustomer | {};  
    logged          : boolean;
    phoneVerified   : boolean;
}

const initialState: CounterState = {
    user         : {},
    logged       : false,
    phoneVerified: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startReavlidateToken: (state, action: PayloadAction<IAuthCustomer>) => {
            state.user          = action.payload.user;
            state.logged        = action.payload.logged;
            state.phoneVerified = action.payload.user?.phone.verified || false
        },
        startLogin: (state, action: PayloadAction<ICustomer>) => {
            state.user          = action.payload;
            state.logged        = true;
            state.phoneVerified = action.payload?.phone?.verified || false
        },
        startGoogleLogin: (state, action: PayloadAction<IAuthCustomer>) => {
            state.user          = action.payload.user;
            state.logged        = action.payload.logged;
            state.phoneVerified = action.payload.user?.phone?.verified || false
        },
        startRegister: (state, action: PayloadAction<ICustomer>) => {
            state.user          = action.payload;
            state.logged        = true;
            state.phoneVerified = false
        },
        startRegisterPhone:(state, action: PayloadAction<ICustomer>) => {
            return {
                ...state,
                user : action.payload,
            }
        },
        startChangePassword: (state, action: PayloadAction<ICustomer>) => {
            return {
                ...state,
                user : action.payload,
            }
        },
        startUpdateProfile: (state, action: PayloadAction<ICustomer>) => { 
            return{
                ...state,
                user : action.payload,
            }
        },
        startLogout: (state) => {
            state.logged = false;
            state.user   = {}
        },
        startValidatePhone: (state) => {
            return{
                ...state,
                phoneVerified: true
            }
        }
    }
})

export const { startLogin, startReavlidateToken, startRegister, startGoogleLogin, startRegisterPhone, startChangePassword, startUpdateProfile, startLogout, startValidatePhone } = authSlice.actions;

export default authSlice.reducer;