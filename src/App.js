
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import Auth from './Components/pages/Auth';
import Home from "./Components/pages/Home";
import { ToastContainer } from "react-toastify";
import { UserAuthContextProvider } from './firebase/AuthContext';
import { auth } from "./firebase/Firebase";
import { signOut } from "firebase/auth";
import { NotFound } from "./Components/pages/NotFound";
import CreateEditBlog from "./Components/pages/CreateEditBlog";
import Detail from "./Components/pages/Detail";

function App() {

  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/login");
    });
  };


  return (
    <UserAuthContextProvider>
      <div className="App">
        <Navbar setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
        />
        <ToastContainer position="top-center" />
         <Routes>
         <Route path='/' element={<Home setActive={setActive} user={user} />}/>
         <Route path="/detail/:id" element={<Detail setActive={setActive} />} />
         <Route path="/crear" element={ user?.uid ? <CreateEditBlog user={user} /> : <Navigate to="/"/>}/>
         <Route path="/update/:id" element={ user?.uid ? <CreateEditBlog user={user} setActive={setActive} /> : <Navigate to="/" />}/>
          <Route path={user ? '/' : '/login'} element={<Auth setActive={setActive} setUser={setUser} />}/>
          <Route path="*" element={<NotFound />} />
         </Routes>
      </div>
    </UserAuthContextProvider>
  );
}

export default App;
