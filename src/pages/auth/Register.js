import React, { useState } from 'react';
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/features/auth/authSlice';

const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
};

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, cPassword } = formData;

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    };

    const registerUser = async (e) => {
        e.preventDefault();
        if (!email || !password){
            return toast.error("All fields are required")
        }
        if (password.length < 6){
            return toast.error("Password must be up to 6 characters")
        }
        if (!validateEmail(email)){
            return toast.error("Please enter a valid email")
        }
        if (password !== cPassword){
            return toast.error("Passwords do not match")
        }
        const userData = {
            name,
            email,
            password
        }

        await dispatch(register(userData));
    }; 

  return (

    <>
    
    <section className={`container ${styles.auth}`}>
        
        <Card>
            <div className={styles.form}>
                <h2>Register</h2>
                <form onSubmit={registerUser}>

                <input 
                type='text'
                placeholder='Name'
                required
                name="name"
                value={name}
                onChange={handleInputChange}
                />

                <input 
                type='text'
                placeholder='Email'
                required
                name="email"
                value={email}
                onChange={handleInputChange}
                />

                <input 
                type='password'
                placeholder='Password'
                required
                name={"password"}
                value={password}
                onChange={handleInputChange}
                />

                <input 
                type='password'
                placeholder='Confirm Password'
                required
                name="cPassword"
                value={cPassword}
                onChange={handleInputChange}
                />

                <button type='submit' className='--btn --btn-primary --btn-block'>
                    Register
                </button>
                </form>
                <span className={styles.register}>
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
                </span>
            </div>
        </Card>
        <div className={styles.img}>
            <img src={loginImg} alt='Login' width='400' />
        </div>
        
    </section>
    </>
  )
}

export default Register