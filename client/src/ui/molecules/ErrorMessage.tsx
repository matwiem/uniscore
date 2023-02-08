import { Center, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import {
    getErrorMessage,
    type UserErrorMessage
} from '../../utils/error-handling/error-messages'

interface ErrorMessageProps {
    message: UserErrorMessage
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    const { message } = props

    return (
        <Container py={10}>
            <Center>
                <VStack>
                    <WarningIcon boxSize={10} />
                    <Heading>Something went wrong...</Heading>
                    <Text>{getErrorMessage(message)}</Text>
                </VStack>
            </Center>
        </Container>
    )
}
