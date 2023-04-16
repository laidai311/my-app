import { AuthContext } from './AuthContext';
import { auth } from './firebase';
import { useEffect, useMemo, useReducer } from 'react';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getIdTokenResult,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { setAccessToken } from '@/configs/axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        status: 'checking',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        status: 'authenticated',
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        status: 'no-authenticated',
      };
    case 'AUTH_CLEAR':
      return {
        user: null,
        isLoading: false,
        status: 'checking',
      };
    default:
      throw Error('Unknown action.');
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isLoading: true,
    status: 'checking', // 'checking' | 'authenticated' | 'no-authenticated'
  });

  const handleAuthStateChanged = (rawUser) => {
    if (rawUser) {
      const { token, userWithoutToken } = formatUser(rawUser);
      dispatch({ type: 'FETCH_SUCCESS', payload: userWithoutToken });
      setAccessToken(token);
      return userWithoutToken;
    } else {
      dispatch({ type: 'FETCH_FAILURE' });
    }
    return null;
  };

  useEffect(() => {
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  const signInApp = async ({ email, password, isRemember }) => {
    dispatch({ type: 'FETCH_INIT' });

    await setPersistence(
      auth,
      isRemember ? browserLocalPersistence : browserSessionPersistence
    );
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    handleAuthStateChanged(user);

    Cookies.set(
      `account-${email}`,
      JSON.stringify({
        email,
        password: isRemember ? password : '',
        name: user?.displayName,
        photoURL: user?.photoURL,
      }),
      { expires: 7 }
    );

    return user;
  };

  const clearAuth = () => {
    dispatch({ type: 'AUTH_CLEAR' });
  };

  const signOutApp = () => {
    dispatch({ type: 'FETCH_INIT' });
    signOut(auth).then(clearAuth);
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

  const val = useMemo(
    () => ({
      ...state,
      signInApp,
      signOutApp,
      refreshToken,
    }),
    [state]
  );

  return <AuthContext.Provider value={val} {...props} />;
};

const formatUser = (user) => ({
  uid: user?.uid,
  email: user?.email,
  name: user?.displayName,
  photoURL: user?.photoURL,
  token: user?.accessToken,
  // refreshToken: user?.refreshToken,
});
