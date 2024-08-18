import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Star = () => {
  const [size, setSize] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const sizeFactor = 20;
  const iterationTime = 10000;

  const updateValues = () => {
    const newSize = Math.max(0.1, Math.random()) * sizeFactor;
    const newOpacity = 0.5 + Math.random() * 0.5;
    const newXPosition = Math.floor(Math.random() * 100);
    const newYPosition = Math.floor(Math.random() * 100);

    setSize(newSize);
    setOpacity(newOpacity);
    setXPosition(newXPosition);
    setYPosition(newYPosition);
  };


  useEffect(() => {
    updateValues();
    const interval = setInterval(updateValues, iterationTime); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const loaderVariants = {
    animationOne: {
      x: [-20, 200],
      y: [0, -300],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 10,
        },
        y: {
          yoyo: Infinity,
          duration: 10,
          ease: 'easeOut'
        }
      }
    }
  };

  return (
    <Box
      as={motion.div}
      variants={loaderVariants}
      animate="animateOne"
      w={size}
      h={size}
      bg="white"
      opacity={opacity}
      top={yPosition.toString() + "%"}
      left={xPosition.toString() + "%"}
      zIndex={2}
      position="relative"
      borderRadius={size * sizeFactor * 0.5}
      boxShadow="0px 0px 10px #fff"
    ></Box>
  );
};

export default Star;

/*


Tankar om framer:
initial: opacity: 1- 0.5 
animate: ska gå mot 0, detta ska ske under 10 sekunder (kanske att millisekunder ska vara ett input till stjärnorna så att alla varierar)

import React, { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";

const Star: React.FC = () => {
  const [size, setSize] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState(0);

  const updateValues = () => {
    const sizeFactor = 20;
    const newSize = Math.max(0.1, Math.random()) * sizeFactor;
    const newOpacity = Math.random();
    const newPosition = Math.floor(Math.random() * 100);
    
    setSize(newSize);
    setOpacity(newOpacity);
    setPosition(newPosition);
  };

  useEffect(() => {
    updateValues(); // Initial update
    const interval = setInterval(updateValues, 10000); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Box
      w={size}
      h={size}
      bg="white"
      opacity={opacity}
      top={position.toString() + "%"}
      left={position.toString() + "%"}
      zIndex={2}
      position="absolute"
      borderRadius={size * 0.5}
      boxShadow="0px 0px 10px #fff"
    />
  );
};

export default Star;



*/
 /*
  const starAnimate = {
    start: { opacity: opacity, x: xPosition, y: yPosition },
    end: {
      opacity: 0,
      transition: {
        duration: iterationTime,
      },
    },
  };
*/
  //const sizeFactor = 20;
  //const size = Math.max(0.1, Math.random()) * sizeFactor;
  //const opacity = Math.random();
  //const position = Math.floor(Math.random() * 100);
  /*
  const spin = keyframes`  
  from {transform:  translate(0%, 0%);}   
  to {transform:  translate(100%, 100%)} 
`;
  const spinAnimation = `${spin} infinite 2s linear`;*/