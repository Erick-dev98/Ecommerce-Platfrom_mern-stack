import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => {
    <>
      <OgComponent />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, duration: 1 }}
        // transition={{ duration: 0.3 }}
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, duration: 1 }}
        // transition={{ duration: 0.3 }}
      />
    </>;
  };
};

export default transition;
