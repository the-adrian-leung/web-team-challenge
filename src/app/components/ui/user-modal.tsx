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
import { UserData } from './user-data'

const UserModal = ({ isOpen, onClose, isUpdate = false }: { isOpen: boolean; onClose: () => void, isUpdate?: boolean }) => {
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
    redirect('/information?page=1')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent className='profile'>
        <ModalHeader>{isUpdate ? 'Update Your Information' : 'Enter Your Information'}</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel className='profileLabel'>Username</FormLabel>
            <Input 
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel className='profileLabel'>Job Title</FormLabel>
            <Input
              value={userData.jobTitle}
              onChange={(e) => setUserData({ ...userData, jobTitle: e.target.value })}
            />
          </FormControl>
          <Toaster />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>
            {isUpdate ? 'Update' : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UserModal;