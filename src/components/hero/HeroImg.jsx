"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

const HeroImg = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Animation - 1722974964784.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div>
       <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 550, height: 550 }}
      />
    </div>
  )
}

export default HeroImg;
