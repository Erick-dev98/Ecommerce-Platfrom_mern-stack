import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";

const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])

  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;
