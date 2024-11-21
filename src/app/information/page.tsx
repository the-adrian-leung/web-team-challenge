/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useQuery, gql } from '@apollo/client'
// import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AuthModal from '../components/ui/auth-modal'
import { Box, Button, Grid, useDisclosure, Text, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

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
      }
    }
  }
`

export default function InformationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = parseInt(searchParams.get('page') || '1')
  const { onClose } = useDisclosure()
  const [userData, setUserData] = useState(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page }
  })

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [data, userData])

  console.log('userData', userData)
  console.log('error', error)
  console.log('data', data)

  const handlePageChange = (newPage: number) => {
    router.push(`/information?page=${newPage}`)
  }

  if (!userData) {
    return <AuthModal isOpen={true} onClose={onClose} />
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {data?.characters.results.map((character: { id: string; name: string; image: string; species: string; status: string }) => (
          <Box 
            key={character.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={character.image} alt={character.name} />
            <Box p={4}>
              <Text fontWeight="bold">{character.name}</Text>
              <Text>{character.species}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
      
      <Box mt={4}>
        <Button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          ml={2}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data?.characters.info.pages}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}
