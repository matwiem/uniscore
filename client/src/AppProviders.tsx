import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './utils/error-handling/ErrorFallback'

const queryClient = new QueryClient()

interface AppProvidersProps {
    children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
    const { children } = props
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <ErrorBoundary FallbackComponent={ErrorFallback} >
                        {children}
                    </ErrorBoundary>
                </ChakraProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}
