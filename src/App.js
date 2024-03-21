import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  axios.defaults.withCredentials = true;

  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;
