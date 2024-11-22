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

/**
 * CharacterModalProps interface
 * 
 * This interface defines the props for the CharacterModal component.
 */
interface CharacterModalProps {
  /**
   * The character object containing details to be displayed in the modal.
   */
  character: Character | null

  /**
   * Determines if the modal is open.
   */
  isOpen: boolean

  /**
   * Function to close the modal.
   */
  onClose: () => void
}

/**
 * CharacterModal component
 * 
 * This component renders a modal that displays detailed information about a character.
 * 
 * @param {CharacterModalProps} props - The props for the CharacterModal component.
 * @returns {JSX.Element | null} The rendered modal component or null if no character is provided.
 */
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