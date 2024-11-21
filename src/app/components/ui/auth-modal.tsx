'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal'
import { Toaster, toaster } from "./toaster"
import { useEffect, useState } from 'react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Button, Input } from '@chakra-ui/react'
import * as React from "react"
import { redirect } from 'next/navigation'

interface UserData {
  username: string;
  jobTitle: string;
}

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    jobTitle: ''
  })

  useEffect(() => {
    if(localStorage) {
      const storedUserData = localStorage?.getItem('userData')
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
   
  }, [userData])

  const handleSubmit = () => {
    if (!userData.username || !userData.jobTitle) {
      toaster.create({
        title: "Error",
        description: "Please fill in all fields",
      })
      return
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    setUserData(userData)
    onClose()
    redirect('/information')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your Information</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input 
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Job Title</FormLabel>
            <Input
              value={userData.jobTitle}
              onChange={(e) => setUserData({...userData, jobTitle: e.target.value})}
            />
          </FormControl>
          <Toaster />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal;