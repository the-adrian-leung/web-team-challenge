'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { system } from './theme'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider value={system}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}