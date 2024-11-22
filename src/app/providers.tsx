'use client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

/**
 * Apollo Client configuration
 * 
 * This configuration sets up the Apollo Client with the Rick and Morty GraphQL API endpoint
 * and an in-memory cache.
 */
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

/**
 * Providers component
 * 
 * This component serves as a wrapper for context providers used in the application.
 * It includes the ChakraProvider for Chakra UI, ThemeProvider for theme management,
 * and ApolloProvider for Apollo Client.
 * 
 * @param {object} props - The props for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers.
 * @returns {JSX.Element} The rendered Providers component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}