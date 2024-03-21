import React from 'react';
import styles from "./Loader.module.scss";
import ReactDom from "react-dom";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDom.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loaderImg} alt='loading' />
        </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
    return (
        <div className='--center-all'>
            <img src={loaderImg} alt='loading' width={40} />
        </div>
    )
}

export default Loader