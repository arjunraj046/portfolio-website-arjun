"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// lottie-web touches `document` at import time, so it must stay off the server
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

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
        style={{ width: 500, height: 500 }}
      />
    </div>
  )
}

export default HeroImg;
