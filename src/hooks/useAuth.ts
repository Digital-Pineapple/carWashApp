import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { login, register, loginWithGoogle, revalidateToken, verifyAccount, sendCodeVerification, updateImageProfile  } from '../actions/authActions';
import { useAppDispatch, useAppSelector } from './useRedux';

import { startLoading, stopLoading } from '../reducers/uiReducer';

import { ICustomer } from '../Interfaces/LoginInterface';
import { INavigator } from '../Interfaces/NavigatorInterface';
import { Asset } from 'react-native-image-picker';
import { startLogout } from '../reducers/authReducer';

export interface ILoginValues {
    email: string;
    password: string;
}

export interface IRegisterValues extends ILoginValues {
    fullname: string;
}

export interface ILoginGoogleValues {
    idToken: string | null;
}

export interface IPhoneNumber {
    prefix: string;
    phone_number: string;
}

export interface IVerifyCode {
    code: number;
}

interface ISuccessFunction {
    success: boolean;
    user: ICustomer
}

export const useAuth = (navigation: INavigator) => {

    const dispatch = useAppDispatch();

    const { user, logged, phoneVerified } = useAppSelector((state) => state.auth);

    const startSignIn = async (data: ILoginValues) => {
        dispatch(startLoading())
        const { success, user: customer } = await dispatch(login(data)) as ISuccessFunction;

        if (!success) return dispatch(stopLoading());

        if (!customer.hasOwnProperty('phone') && !customer?.phone?.verified) {
            navigation.replace('VerifyPhoneScreen');
            return dispatch(stopLoading())
        }
        // navigation.replace('Home');
        return dispatch(stopLoading()); 
    }

    const startSignUp = async (data: IRegisterValues) => await dispatch(register(data));

    const startRevalidateToken = async () => await dispatch(revalidateToken());

    const startGoogleSignIn = async () => {
        await GoogleSignin.hasPlayServices()
        const { idToken } = await GoogleSignin.signIn();
        await dispatch(loginWithGoogle({ idToken }));
    }

    const startVerifyAccount = async (data: IPhoneNumber) => {
        const { success } = await dispatch(verifyAccount(data)) as ISuccessFunction;
        if (!success) return;
        navigation.navigate('VerifyPhoneCodeScreen');
    }

    const sendCodeToVerifyPhone = async (data: IVerifyCode) => {
        dispatch(startLoading())
        const { success } = await dispatch(sendCodeVerification(data)) as ISuccessFunction;
        if (!success) return dispatch(stopLoading());
        navigation.replace('Home')
    }

    const startUploadImage = async (data: Asset) => {

        dispatch(startLoading());
        const formData = new FormData();
        formData.append("photo", { 
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        });        
        await dispatch(updateImageProfile(formData));
        dispatch(stopLoading());

    }

    const startLogoutUser = async () => {
        await AsyncStorage.removeItem('token');
        dispatch(startLogout())
    }

    return { startSignIn, startSignUp, startGoogleSignIn, phoneVerified, user, logged, startRevalidateToken, startVerifyAccount, sendCodeToVerifyPhone, startUploadImage, startLogoutUser }


}