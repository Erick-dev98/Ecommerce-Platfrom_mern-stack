import React, { useState } from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaTimes} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';


export const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                Shop<span>Mpya</span>
            </h2>
        </Link>
    </div>
);

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fixNavbar = () => {
        if (window.scrollY > 50) {
            setScrollPage(true);
        } else {
            setScrollPage(true);
        }
    };
    window.addEventListener("scroll", fixNavbar)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    };
    const hideMenu = () => {
        setShowMenu(false)
    };

    const logoutUser = async () => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        navigate("/login");
    };

    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Cart
                <FaShoppingCart size={20}/>
                <p>0</p>
            </Link>
        </span>
    )

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
            {logo}
            <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>

                <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}
                onClick={hideMenu}>

                </div>

                <ul>
                    <li className={styles["logo-mobile"]}>
                        {logo}
                        <FaTimes size={22} color='#fff' onClick={hideMenu} />
                    </li>
                    <li>
                        <NavLink to="/shop" className={activeLink}>
                        Shop
                        </NavLink>
                    </li>
                </ul>

                <div className={styles["header-right"]}>
                    <span className={styles.links}>
                        <ShowOnLogout>
                        <NavLink to={"login"} className={activeLink}>
                            Login
                        </NavLink>
                        </ShowOnLogout>
                        
                        <ShowOnLogout>
                        <NavLink to={"register"} className={activeLink}>
                            Register
                        </NavLink>
                        </ShowOnLogout>

                        <ShowOnLogin>
                        <NavLink to={"order-history"} className={activeLink}>
                            My Order
                        </NavLink>
                        </ShowOnLogin>

                        <ShowOnLogin>
                        <Link to={"/"} onClick={logoutUser}>
                            Logout
                        </Link>
                        </ShowOnLogin>
                    </span>
                    {cart}
                </div>
            </nav>
            <div className={styles["menu-icon"]}>
                {cart}
                <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
            </div>
        </div>
    </header>
  )
}

export default Header