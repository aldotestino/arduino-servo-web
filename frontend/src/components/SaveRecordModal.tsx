import React, { useRef, useState } from 'react';
import { Box, Button, FormControl, Text, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, HStack, Icon } from '@chakra-ui/react';
import { ArrowRightIcon } from '@heroicons/react/solid';

interface SaveRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, delay: number) => Promise<void>
  movements: number[]
}

function SaveRecordModal({ isOpen, onClose, onSave, movements }: SaveRecordModalProps) {

  const initialRef = useRef(null);
  const [input, setInput] = useState({
    name: '',
    delay: 0,
  });

  async function handleOnSave() {
    await onSave(input.name, input.delay);
    onClose();
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Record name</FormLabel>
            <Input 
              ref={initialRef} 
              placeholder='my record' 
              value={input.name} 
              onChange={e => setInput(prevState => ({ ...prevState, name: e.target.value }))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Delay in ms</FormLabel>
            <NumberInput
              value={input.delay}
              onChange={val => setInput(prevState => ({ ...prevState, delay: parseInt(val) }))}
              min={0}
              step={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Box mt={4}>
            <FormLabel>Positions</FormLabel>
            <HStack wrap="wrap">
              {movements.map((pos, i) => 
                <>
                  <Text key={i}>{pos}°</Text>
                  {i < movements.length -1 && <Icon as={ArrowRightIcon} w="4" />}
                </>
              )}
            </HStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={handleOnSave} mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>
            Discard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaveRecordModal;