'use client'
import { Box, Text } from '@chakra-ui/react'

export function Footer() {  
  return (
    <Box as="footer" py={4} textAlign="center" borderTopWidth={1}>
      <Text>Web Challenge v 0.1.0</Text>
    </Box>
  )
}