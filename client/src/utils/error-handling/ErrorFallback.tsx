import { Link, Center, Container, VStack, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { ErrorMessage } from '../../ui/molecules/ErrorMessage'
import { getUserErrorMessage } from './error-messages'

interface ErrorFallbackProps {
    error: Error
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = (props) => {
    const { error } = props

    return (
        <Container>
            <Center>
                <VStack>
                    <ErrorMessage message={getUserErrorMessage(error)} />
                    <Link to='/' as={ReactLink} >
                        <Button>
                            Go home
                        </Button>
                    </Link>
                </VStack>
            </Center>
        </Container>
    )
}
