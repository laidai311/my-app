import { createContext, useContext } from "react";
import useFirebaseAuth from "@/libs/useFirebaseAuth";

const authUserContext = createContext({
    authUser: null,
    isLoading: true,
    signInApp: async () => {},
    signOutApp: async () => {},
});

export const AuthUserProvider = (props) => {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth} {...props} />;
};

export const useAuth = () => useContext(authUserContext);
