import  {React, createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { auth } from "./Firebase";

  const userAuthContext = createContext();

  export function UserAuthContextProvider({children}) {

    const [user, setUser] = useState({});
    
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    function googlesignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsusbcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
        return () => {
            unsusbcribe();
        };
    }, []);

    return(
        <userAuthContext.Provider 
        value={{user, login, signup, logOut, googlesignIn}}>
            {children}
        </userAuthContext.Provider>
    )
  }

export function useUserAuth(){
    return useContext(userAuthContext);
}





