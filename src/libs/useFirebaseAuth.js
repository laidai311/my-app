import { auth } from '@/configs/firebase';
import { useEffect, useReducer } from 'react';
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
// 'checking' | 'authenticated' | 'no-authenticated'
const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_USER_INIT':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_AUTH_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        authUser: action.payload,
      };
    case 'FETCH_AUTH_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'AUTH_USER_CLEAR':
      return {
        authUser: null,
        isLoading: false,
      };
    default:
      throw Error('Unknown action.');
  }
};

const formatAuthUser = (user) => ({
  uid: user?.uid,
  email: user?.email,
  name: user?.displayName,
  photoURL: user?.photoURL,
  token: user?.accessToken,
  refreshToken: user?.refreshToken,
});

const useFirebaseAuth = () => {
  const [{ authUser, isLoading }, dispatch] = useReducer(reducer, {
    authUser: null,
    isLoading: true,
  });

  const handleAuthStateChanged = (rawUser) => {
    if (rawUser) {
      const user = formatAuthUser(rawUser);
      dispatch({ type: 'FETCH_AUTH_USER_SUCCESS', payload: user });
      setAccessToken(user.token);
    } else {
      dispatch({ type: 'FETCH_AUTH_USER_FAILURE' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'AUTH_USER_INIT' });
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  const signInApp = ({ email, password, isRemember }) => {
    dispatch({ type: 'AUTH_USER_INIT' });
    setPersistence(
      auth,
      isRemember ? browserLocalPersistence : browserSessionPersistence
    ).then(() => {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          handleAuthStateChanged(userCredential?.user);

          Cookies.set(
            `account-${email}`,
            JSON.stringify({
              email,
              password: isRemember ? password : '',
              name: userCredential?.user?.displayName,
              photoURL: userCredential?.user?.photoURL,
            }),
            {
              expires: 7,
            }
          );
        }
      );
    });
  };

  const clearAuthUser = () => {
    dispatch({ type: 'AUTH_USER_CLEAR' });
  };

  const signOutApp = () => {
    dispatch({ type: 'AUTH_USER_INIT' });
    signOut(auth).then(clearAuthUser);
  };

  const getFreshToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await getIdTokenResult(currentUser, false);
      return `${token}`;
    } else {
      return '';
    }
  };

  return {
    authUser,
    isLoading,
    signInApp,
    signOutApp,
    getFreshToken,
  };
};

export default useFirebaseAuth;
