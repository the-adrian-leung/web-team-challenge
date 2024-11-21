import { Box, Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'

const App = () => {
  return (
    <Box className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Box className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Heading as="h1" mb={4}>The Rick and Morty Wiki</Heading>
          <Image src={`/rickmorty.jpg`} width={240} height={360} alt='The Rick and Morty' />
          <Link href="/information" passHref>
            <Button>VIP Access</Button>
          </Link>
      </Box>
    </Box>
  );
}

export default App;
