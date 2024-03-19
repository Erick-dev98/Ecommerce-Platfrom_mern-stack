import React from 'react';
import { FaShippingFast } from "react-icons/fa";
import { BsFillCreditCardFill, BsCartCheck, BsClockHistory } from "react-icons/bs";

const data = [
    {
      icon: <FaShippingFast size={30} color="#8cb4f5" />,
      heading: "Free Shipping",
      text: "We offer free shipping on special products",
    },
    {
      icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
      heading: "Secure Payment",
      text: "Make secure payment for your product.",
    },
    {
      icon: <BsCartCheck size={30} color="#fa82ea" />,
      heading: "Quality Products",
      text: "We sell products from only tested and proven brands.",
    },
    {
      icon: <BsClockHistory size={30} color="#82fa9e" />,
      heading: "24/7 Support",
      text: "Get access to support from our exprt support team.",
    },
  ];

const HomeInfoBox = () => {
  return (
    <div className='infoboxes --mb2'>
        {data.map((item, index) => {
            const {icon, heading, text} = item;
            return(
                <div className='infobox' key={index}>
                    <div className='icon'></div>
                </div>
            )
        })}
    </div>
  )
}

export default HomeInfoBox