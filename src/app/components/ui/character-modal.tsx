'use client'

import { Character } from '@/app/components/ui/character'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal'

import {
  Button,
  Image,
  Text,
  Box,
} from '@chakra-ui/react'

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

const CharacterModal = ({ character, isOpen, onClose }: CharacterModalProps) => {
  if (!character) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent className='modal'>
        <ModalHeader className='modalHeader'>{character.name}</ModalHeader>
        <ModalBody>
          <Box textAlign="center">
            <Image
              src={character.image}
              alt={character.name}
              borderRadius="md"
              mx="auto"
            />
            <Text mt={4}>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
            {character.type && <Text>Type: {character.type}</Text>}
            <Text>Gender: {character.gender}</Text>
            <Text>Origin: {character.origin?.name}</Text>
            <Text>Location: {character.location?.name}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CharacterModal