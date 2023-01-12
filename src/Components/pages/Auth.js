import React, { useState } from 'react';
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../firebase/AuthContext";
import {
  updateProfile,
} from "firebase/auth";

const initialState = {
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {

  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const { login, signup} = useUserAuth();
  const { email, password, firstName, lastName, confirmPassword } = state;
  
  const [firstname, setFirstName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const {user} = await login(email, password);
        setUser(user);
        setActive("home");
      } else {
        return console.log("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return console.log("Password don't match");
      }
      if (firstName && lastName && email && password) {

        const {user} = await signup(email, password);

        await updateProfile(user, { displayName: `${firstname} ${lastName}` });
        setActive("/");
      } else {
        return console.log("All fields are mandatory to fill");
      }
    }
    navigate("/");
  }

  return (
    <div className="flex min-h-[93.7%] items-center navback justify-center  px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <SiGnuprivacyguard className='mx-auto h-20 w-auto text-blue-600' />
      {!signUp ? <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Log In</h2> : <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Crea Tu Propia Cuenta</h2>}
    
      <div className='mt-2 text-center font-bold text-black'>
      {signUp ? <p className="font-medium text-white hover:text-blue-500"> Empiza a compartir tus lugares favoritos</p> : <p className="font-medium text-white hover:text-blue-500"> Sigue compartiendo tus lugares favoritos</p>}
      </div>
      
    </div>
    <form className="mt-8 space-y-8" onSubmit={handleAuth}>
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
      {signUp &&
      <div  className='flex mb-5'>
          <label htmlFor="firstname" className="sr-only">First Name</label>
          <input id="firstname" name="firstname" type="text" autoComplete="firstName" onChange={(e) => {setFirstName(e.target.value)}} required className="relative block w-[50%] mr-5 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First Name"/>
          <label htmlFor="lasttname" className="sr-only">Last Name</label>
          <input id="lasttname" name="lasttname" type="text" autoComplete="lasttname" value={lastName} onChange={handleChange} required className="relative block w-[50%] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last Name"/>
        
        </div>
        }
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" value={email} onChange={handleChange} required className="mb-5 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={handleChange} required className="mb-5 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>
        </div>
        {signUp &&
        <div>
          <label htmlFor="confirmpassword" className="sr-only">Confirm Password</label>
          <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" value={confirmPassword} onChange={handleChange} required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password"/>
        </div>
        } 
      </div>


      {!signUp &&
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <label htmlFor="remember-me" className="ml-2 block font-bold text-sm text-black-900">Remember me</label>
        </div> 
       

        <div className="text-sm">
          <a href="/" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
        </div>
      </div>
    }

      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </span>
          {signUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
    {!signUp ? (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small  font-bold mt-2 pt-1 mb-0">
                      Don't have an account ?&nbsp;
                      <span
                        className="link-danger"
                        style={{ textDecoration: "none", cursor: "pointer", color: "white", }}
                        onClick={() => setSignUp(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small font-bold mt-2 pt-1 mb-0">
                      Already have an account ?&nbsp;
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => setSignUp(false)}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
  </div>
</div>
  )
}

export default Auth;