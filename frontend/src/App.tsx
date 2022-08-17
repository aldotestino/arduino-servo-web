import React, { useEffect, useState } from 'react';
import {  Heading, VStack } from '@chakra-ui/react';
import Servo from './components/Servo';
import ServoSlider from './components/ServoSlider';
import { BASE_URL, getDeg } from './lib/api';
import io from 'socket.io-client';
import Records from './components/Records';

const ioSocket = io(BASE_URL);

function App() {

  const [deg, setDegUI] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    getDeg().then(res => {
      setDegUI(res.deg);
      setIsLocked(res.isLocked);
      setLoading(false);
    });

    ioSocket.on('deg-changed', data => {
      setDegUI(data.deg);
    });

    ioSocket.on('locked', () => {
      setIsLocked(true);
    });

    ioSocket.on('unlocked', () => {
      setIsLocked(false);
    });


    return () => {
      ioSocket.off('deg-changed');
      ioSocket.off('locked');
      ioSocket.off('unlocked');
    };
  }, []);
  
  function handleChange(val: number) {
    setDegUI(val);
  }

  async function onChangeEnd(val: number) {
    //await setDeg(val);
    ioSocket.emit('change-deg', { degToSet: val });
  }

  return (
    <VStack minH="100vh" px={[2, 2, 5, 10, 20]} py={20} spacing={10}>
      <Heading>Arduino Servo</Heading>
      {!loading && 
      <>
        <ServoSlider isLocked={isLocked} onChange={handleChange} onChangeEnd={onChangeEnd} defaultValue={deg} deg={deg} />
        <Servo deg={deg} />
        <Records currentDeg={deg} isLocked={isLocked} />
      </>
      }
    </VStack>  
  );
}

export default App;
