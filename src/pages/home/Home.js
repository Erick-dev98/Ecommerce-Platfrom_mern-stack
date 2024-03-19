import React from 'react';
import Slider from '../../components/slider/Slider';
import "./Home.scss";
import HomeInfoBox from './HomeInfoBox';

const Home = () => {
  return (
    <>
      <Slider />
      <section>
        <div className='container'>
          <HomeInfoBox />
        </div>
      </section>
    </>
  )
}

export default Home