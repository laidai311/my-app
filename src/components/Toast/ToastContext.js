import { createContext } from 'react';

export const ToastContext = createContext({
  open: ({ type, content }) => {},
});
