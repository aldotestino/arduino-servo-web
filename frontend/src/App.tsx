import React, { useEffect, useState } from 'react';
import {  Heading, VStack } from '@chakra-ui/react';
import Servo from './components/Servo';
import ServoSlider from './components/ServoSlider';
import { BASE_URL, getDeg, setDeg } from './lib/api';
import io from 'socket.io-client';

const ioSocket = io(BASE_URL);

function App() {

  const [deg, setDegUI] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isConnected, setIsConnected] = useState(ioSocket.connected);

  useEffect(() => {
    getDeg().then(d => {
      setDegUI(d);
      setLoading(false);
    });

    ioSocket.on('connect', () => {
      setIsConnected(true);
    });

    ioSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    ioSocket.on('deg-changed', data => {
      setDegUI(data.deg);
    });

    return () => {
      ioSocket.off('connect');
      ioSocket.off('disconnect');
      ioSocket.off('deg-changed');
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
    <VStack h="100vh" p={20} spacing={10}>
      <Heading>Arduino Servo</Heading>
      {!loading && 
      <>
        <ServoSlider onChange={handleChange} onChangeEnd={onChangeEnd} defaultValue={deg} deg={deg} />
        <Servo deg={deg} />
      </>
      }
    </VStack>  
  );
}

export default App;
