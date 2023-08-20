import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
});

// function AuthUserProvider({ children }) {
//   const auth = useFirebaseAuth();
//   return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
// }


// function useAuth(){
//   const auth = useContext(authUserContext);
//   return auth;
// };

// export {AuthUserProvider, useAuth}


export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);