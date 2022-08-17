import { Button, IconButton, SimpleGrid, useDisclosure, useToast, Icon, HStack } from '@chakra-ui/react';
import { addRecord, deleteRecord, executeRecord, getAllRecords } from '../lib/api';
import React, { useState } from 'react';
import SaveRecordModal from './SaveRecordModal';
import { PlayIcon, TrashIcon } from '@heroicons/react/outline';

interface RecordProps {
  isLocked: boolean
  currentDeg: number
}

function Records({ isLocked, currentDeg }: RecordProps) {

  const [recs, setRecs] = useState<string[]>([]);
  const [showRecs, setShowRecs] = useState(false);
  const [movements, setMovements] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  async function toggleRecords() {
    if(showRecs) {
      setShowRecs(false);
    }else {
      if(recs.length === 0) {
        const res = await getAllRecords();
        console.log(res);
        setRecs(res);
      }
      setShowRecs(true);
    }
  }

  async function saveRecord(name: string, delay: number) {
    console.log({ name, movements, delay });
    const res = await addRecord(name, movements, delay);
    if(res.ok && recs.length !== 0) {
      setRecs(prevRecs => [...prevRecs, res.data.name]);
    }else {
      toast({
        title: 'Error',
        status: 'error',
        description: res.data.errorMessage,
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
    setMovements([]);
  }

  function handleOnClose() {
    setMovements([]);
    onClose();
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 3]} spacing={[2, 2, 5, 10]}>
        <Button colorScheme="blue" onClick={toggleRecords}>
          {showRecs ? 'Hide' : 'Show'} Records
        </Button>
        <Button 
          colorScheme="blue"
          disabled={isLocked}
          onClick={() => {
            setMovements(prevMovements => [...prevMovements, currentDeg]);
          }}>
          Add Position
        </Button>
        <Button
          colorScheme="blue" disabled={movements.length === 0} onClick={onOpen}>
          Save Record
        </Button>
      </SimpleGrid>
      {showRecs && <SimpleGrid columns={[1, 1, 2, 4]} spacing={[2, 2, 5, 10]}>
        {recs.map(r => 
          <HStack key={r}>
            <Button
              leftIcon={<Icon as={PlayIcon} />}
              disabled={isLocked} 
              onClick={() => {
                executeRecord(r);
              }}>
              {r}
            </Button>
            <IconButton
              disabled={isLocked}
              colorScheme="red" 
              aria-label='delete' 
              icon={<Icon as={TrashIcon} />}
              onClick={async () => {
                const ok = await deleteRecord(r);
                if(ok) {
                  setRecs(prevRecs => prevRecs.filter(n => n !== r));
                }
              }} 
            />
          </HStack>
        )}
      </SimpleGrid>}

      <SaveRecordModal isOpen={isOpen} movements={movements} onClose={handleOnClose} onSave={saveRecord} />
    </>
  );
}

export default Records;