import { auth } from "@/configs/firebase";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    onIdTokenChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import Cookies from "js-cookie";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const formatUser = async (user) => {
    // const token = await user.getIdToken(/* forceRefresh */ true);
    const decodedToken = await user.getIdTokenResult(true);
    const { token, expirationTime } = decodedToken;

    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoURL: user.photoURL,
        token,
        expirationTime,
        // stripeRole: await getStripeRole(),
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USER_INIT":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case "FETCH_USER_FAILURE":
            return {
                ...state,
                isLoading: false,
            };
        case "CLEAR_USER":
            return {
                user: null,
                isLoading: false,
            };
        default:
            throw Error("Unknown action.");
    }
};

const useFirebaseAuth = () => {
    const [{ user, isLoading }, dispatch] = useReducer(reducer, {
        user: null,
        isLoading: true,
    });

    const handleUser = async (rawUser) => {
        dispatch({ type: "FETCH_USER_INIT" });

        if (rawUser) {
            const user = await formatUser(rawUser);
            // const { token, ...userWithoutToken } = user;

            // createUser(user.uid, userWithoutToken);
            // setAccessToken(user.token);
            dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
            return user;
        } else {
            dispatch({ type: "FETCH_USER_FAILURE" });
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = () => onIdTokenChanged(auth, handleUser);
        return () => unsubscribe();
    }, []);

    const signIn = ({ email, password, isRemember }) => {
        setPersistence(
            auth,
            isRemember ? browserLocalPersistence : browserSessionPersistence
        )
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((res) => {
                        handleUser(res.user);

                        Cookies.set(
                            `account-${email}`,
                            JSON.stringify({
                                email,
                                password: !!isRemember ? password : "",
                                name: res?.user.name,
                                photoURL: res?.user.photoURL,
                            }),
                            { expires: 7 }
                        );
                    })
                    .catch((error) => {
                        throw error;
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clearUser = () => {
        dispatch({ type: "CLEAR_USER" });
    };

    const signOutApp = () => {
        dispatch({ type: "FETCH_USER_INIT" });
        signOut(auth).then(clearUser);
    };

    return {
        user,
        isLoading,
        handleUser,
        signIn,
        signOutApp,
    };
};
