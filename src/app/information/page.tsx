'use client'

import { useQuery, gql } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { Box, Button, Grid, useDisclosure, Text, Image } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import CharacterModal from '../components/ui/character-modal'
import { Character } from '../components/ui/character'
import UserModal from '../components/ui/user-modal'

/**
 * GraphQL query to fetch characters with pagination
 */
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

/**
 * InformationPage component
 * 
 * This component renders a page that displays a list of characters from the Rick and Morty GraphQL API.
 * It includes pagination and modals for user information and character details.
 * 
 * @returns {JSX.Element} The rendered InformationPage component.
 */
const InformationPage = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const { open: isCharacterModalOpen, onOpen: onCharacterModalOpen, onClose: onCharacterModalClose } = useDisclosure()
  const { open: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure()

  interface UserData {
    username: string;
    jobTitle: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    skip: !userData
  })

  // Load user data from local storage when the component mounts
  useEffect(() => {    
    if (localStorage && !userData) {
      const storedUserData = localStorage?.getItem('userData')
      if(storedUserData) setUserData(JSON.parse(storedUserData))
    }
  }, [userData])

  /**
   * Handle page change
   * 
   * This function updates the URL with the new page number and navigates to the new page.
   * It addresses the Next.js 15 useRouter issue with page redirection.
   * 
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (e: FormEvent, newPage: number) => {
    e.preventDefault()
    window.history.pushState(null, '', `?page=${newPage < 1 ? 1 : newPage}`) // Fixed the NextJS 15 useRouter issue with the page not redirecting
  }

  /**
   * Handle character click
   * 
   * This function sets the selected character and opens the character modal.
   * 
   * @param {Character} character - The character object to display in the modal.
   */
  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
    onCharacterModalOpen()
  }

  if (!userData) {
    return <UserModal isOpen={true} onClose={onUserModalClose} />
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Box p={4}>
      <Box className='userInfo'>
        Welcome back, {userData?.username} ({userData?.jobTitle})
        <Button className='profileEditButton' onClick={()=>{
            onUserModalOpen()
          }}>Edit Profile</Button>
        </Box>
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
          onClick={(e) => handlePageChange(e, page - 1)}
        >
          Previous
        </Button>
        <Button
          float={'right'}
          ml={2}
          onClick={(e) => handlePageChange(e, page + 1)}
          disabled={page === data?.characters.info.pages}
        >
          Next
        </Button>
      </Box>

      <CharacterModal
        character={selectedCharacter}
        isOpen={isCharacterModalOpen}
        onClose={onCharacterModalClose}
      />

      <UserModal
        isOpen={isUserModalOpen}
        onClose={onUserModalClose}
        isUpdate={true}
      />
    </Box>
  )
}

export default InformationPage
