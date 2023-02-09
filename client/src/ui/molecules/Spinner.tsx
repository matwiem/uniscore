import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react'

export const Spinner = () => {
    return (
        <Center p={8}>
            <ChakraSpinner size='xl' />
        </Center>
    )
}
