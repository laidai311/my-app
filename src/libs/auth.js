import { auth } from "../configs/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser,
    signInWithPopup,
    GoogleAuthProvider,
    getRedirectResult,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
} from "firebase/auth";

auth.languageCode = "vi";
const user = auth.currentUser;

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {
    createUser: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },
    signIn: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },
    signOut: async () => {
        try {
            const res = await signOut(auth);
            // Sign-out successful.
            return res;
        } catch (error) {
            // An error happened.
            throw error;
        }
    },
    setPersistence: async (isRemember) => {
        try {
            await setPersistence(
                auth,
                isRemember ? browserLocalPersistence : browserSessionPersistence
            );
        } catch (error) {
            throw error;
        }
    },
    onChanged: async () => {
        return await new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject("Not authorized");
                }
            });
        });
    },
    user: () => {
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            return {
                displayName,
                email,
                photoURL,
                emailVerified,
                uid,
            };
        } else {
            return null;
        }
    },
    updateProfile: async (args = {}) => {
        try {
            const res = await updateProfile(user, args);
            return res;
        } catch (error) {
            throw error;
        }
    },
    updateEmail: async (email) => {
        try {
            const res = await updateEmail(user, email);
            return res;
        } catch (error) {
            throw error;
        }
    },
    updatePassword: async (password) => {
        try {
            const res = await updatePassword(user, password);
            return res;
        } catch (error) {
            throw error;
        }
    },
    deleteUser: async () => {
        try {
            const res = await deleteUser(user);
            return res;
        } catch (error) {
            throw error;
        }
    },
    signInWithPopup: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    },
    signInWithRedirect: () => {
        signInWithRedirect(auth, provider);
    },
    getRedirectResult: async () => {
        try {
            const result = await getRedirectResult(auth);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    },
    formatUser: async (user) => {
        // const token = await user.getIdToken(/* forceRefresh */ true);
        const decodedToken = await user.getIdTokenResult(true);
        const { token, expirationTime } = decodedToken;

        return {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            provider: user.providerData[0].providerId,
            photoUrl: user.photoURL,
            token,
            expirationTime,
            // stripeRole: await getStripeRole(),
        };
    },
};
