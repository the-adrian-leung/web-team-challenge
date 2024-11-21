'use client'

import { useQuery, gql } from '@apollo/client'
import { useSearchParams, redirect } from 'next/navigation'
import AuthModal from '../components/ui/auth-modal'
import { Box, Button, Grid, useDisclosure, Text, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CharacterModal from '../components/ui/character-modal'
import { Character } from '../Character'

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        count
      }
      results {
        id
        name
        image
        species
        status
        gender
        origin{
          name
        }
        location{
          name
        }
      }
    }
  }
`

const InformationPage = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const { open, onOpen, onClose } = useDisclosure()
  interface UserData {
    username: string;
    jobTitle: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    skip: !userData
  })

  useEffect(() => {    
    if (localStorage && !userData) {
      const storedUserData = localStorage?.getItem('userData')
      if(storedUserData) setUserData(JSON.parse(storedUserData))
    }
  }, [userData])

  const handlePageChange = (newPage: number) => {
    redirect(`/information?page=${newPage < 1 ? 1 : newPage}`)
  }

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
    onOpen()
  }

  if (!userData) {
    return <AuthModal isOpen={true} onClose={onClose} />
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Box p={4}>
      <Box as='h3'>Welcome back, {userData?.username} ({userData?.jobTitle})</Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {data?.characters.results.map((character: Character) => (
          <Box 
            key={character.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => handleCharacterClick(character)}
            cursor="pointer"
          >
            <Image src={character.image} alt={character.name} />
            <Box p={4}>
              <Text fontWeight="bold">{character.name}</Text>
              <Text>{character.species}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
      
      <Box mt={4} display={'block'} paddingBottom={'50px'}>
        <Button float={'left'}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          float={'right'}
          ml={2}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data?.characters.info.pages}
        >
          Next
        </Button>
      </Box>

      <CharacterModal
        character={selectedCharacter}
        isOpen={open}
        onClose={onClose}
      />
    </Box>
  )
}

export default InformationPage
