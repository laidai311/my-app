import { auth } from "@/configs/firebase";
import { useEffect, useReducer } from "react";
import {
    browserLocalPersistence,
    browserSessionPersistence,
    getIdTokenResult,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useUserStore } from "./store";
import { useRouter } from "next/navigation";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_AUTH_USER_INIT":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_AUTH_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                authUser: action.payload,
            };
        case "FETCH_AUTH_USER_FAILURE":
            return {
                ...state,
                isLoading: false,
            };
        case "CLEAR_AUTH_USER":
            return {
                authUser: null,
                isLoading: false,
            };
        default:
            throw Error("Unknown action.");
    }
};

const formatAuthUser = async (user) => {
    // const token = await user.getIdToken(/* forceRefresh */ true);
    const decodedToken = await getIdTokenResult(user, true);
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

const useFirebaseAuth = () => {
    const [{ authUser, isLoading }, dispatch] = useReducer(reducer, {
        authUser: null,
        isLoading: true,
    });
    const router = useRouter();

    // const authStateChanged = async (rawUser) => {
    //     dispatch({ type: "FETCH_AUTH_USER_INIT" });

    //     if (rawUser) {
    //         const user = await formatAuthUser(rawUser);
    //         // const { token, ...userWithoutToken } = user;

    //         // createUser(user.uid, userWithoutToken);
    //         // setAccessToken(user.token);
    //         Cookies.set(`auth`, JSON.stringify(user));
    //         dispatch({ type: "FETCH_AUTH_USER_SUCCESS", payload: user });
    //         return user;
    //     } else {
    //         dispatch({ type: "FETCH_AUTH_USER_FAILURE" });
    //         return null;
    //     }
    // };

    // useEffect(() => {
    //     const unsubscribe = () => {
    //         const local = Cookies.get("auth");
    //         if (local) {
    //             const auth = JSON.parse(local);
    //             dispatch({ type: "FETCH_AUTH_USER_SUCCESS", payload: auth });
    //         } else {
    //             dispatch({ type: "FETCH_AUTH_USER_FAILURE" });
    //         }
    //     };
    //     return () => unsubscribe();
    // }, [router]);

    // .then(
    //     (userCredential) => {
    //         authStateChanged(userCredential.user);
    //         Cookies.set(
    //             `account-${email}`,
    //             JSON.stringify({
    //                 email,
    //                 password: !!isRemember ? password : "",
    //                 name: res?.user.name,
    //                 photoURL: res?.user.photoURL,
    //             }),
    //             { expires: 7 }
    //         );
    //     }
    // );

    const handlePersistence = (isRemember) =>
        setPersistence(
            auth,
            isRemember ? browserLocalPersistence : browserSessionPersistence
        );

    const signInApp = async (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const clearUser = () => {
        // dispatch({ type: "CLEAR_AUTH_USER" });
        Cookies.remove("auth");
    };

    const signOutApp = () => signOut(auth).then(clearUser);

    return {
        authUser,
        isLoading,
        handlePersistence,
        signInApp,
        signOutApp,
    };
};

export default useFirebaseAuth;
