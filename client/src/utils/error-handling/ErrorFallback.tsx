import { Center, Container, VStack, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../../ui/molecules/ErrorMessage'
import { getUserErrorMessage } from './error-messages'

interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: (...args: unknown[]) => void
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = (props) => {
    const { error, resetErrorBoundary } = props
    const navigate = useNavigate()

    return (
        <Container>
            <Center>
                <VStack>
                    <ErrorMessage message={getUserErrorMessage(error)} />
                    <Button onClick={() => {
                        resetErrorBoundary()
                        navigate('/')
                    }}>
                            Go home
                    </Button>
                </VStack>
            </Center>
        </Container>
    )
}
