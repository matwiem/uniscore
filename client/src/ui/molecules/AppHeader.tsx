import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const AppHeader: React.FC<Record<string, never>> = () => {
    return (
        <Box width='100%' py={6} color='white' bgColor='black'>
            <Container>
                <Link to='/'>
                    <Heading>Uniscore</Heading>
                </Link>
            </Container>
        </Box>
    )
}
