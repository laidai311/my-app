import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '@/configs/firebase';
import {
    browserLocalPersistence,
    browserSessionPersistence,
    getIdTokenResult,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { setAccessToken } from '@/configs/axios';
import { setCookie } from 'cookies-next';

const AuthContext = createContext({
    data: undefined,
    status: 'loading',
    signInApp: async () => {},
    signOutApp: async () => {},
    refreshToken: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [data, setData] = useState();
    const [status, setStatus] = useState('loading');

    const handleAuthStateChanged = (rawUser) => {
        if (rawUser) {
            const { token, ...userWithoutToken } = formatUser(rawUser);
            setData(userWithoutToken);
            setAccessToken(token);
            setStatus('authenticated');
            return userWithoutToken;
        }
        setStatus('no-authenticated');
        return null;
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChanged);
    }, []);

    const signInApp = async ({ email, password, isRemember = true }) => {
        await setPersistence(
            auth,
            isRemember ? browserLocalPersistence : browserSessionPersistence
        );
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        handleAuthStateChanged(user);
        setCookie(
            `account-${email}`,
            {
                email,
                password: isRemember ? password : '',
                name: user?.displayName,
                photoURL: user?.photoURL,
            },
            { maxAge: 60 * 60 * 24 * 7 } // 7 days
        );
        return user;
    };

    const authCleaned = () => {
        setData();
        setStatus('cleaned');
        setAccessToken('');
    };

    const signOutApp = () => {
        signOut(auth).then(authCleaned);
    };

    const refreshToken = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const { token } = await getIdTokenResult(currentUser, false);
            setAccessToken(token);
            return `${token}`;
        }
        return '';
    };

    return (
        <AuthContext.Provider
            value={{
                data,
                status,
                signInApp,
                signOutApp,
                refreshToken,
            }}
            {...props}
        />
    );
};

const formatUser = (user) => ({
    uid: user?.uid,
    email: user?.email,
    name: user?.displayName,
    photoURL: user?.photoURL,
    token: user?.accessToken,
    // refreshToken: user?.refreshToken,
});
