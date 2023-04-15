import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  status: 'checking',
  signInApp: async ({ email, password, isRemember }) => {},
  signOutApp: async () => {},
  refreshToken: async () => {},
});
