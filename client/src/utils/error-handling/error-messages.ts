import { type AxiosError, isAxiosError } from 'axios'

export const errorMessagesMap = {
    UNEXPECTED_ERROR: 'Unexpected error occurred. Please contact Support.',
    CONNECTION_FAILURE: 'Internet connection error. Check your wires!',
    NOT_FOUND: "Broken link. The page you're trying to access doesn't exist.",
    SYSTEM_FAILURE: "Something is wrong, but we're working on it!"
}

export interface UserErrorMessage {
    type: keyof typeof errorMessagesMap
}

export const getErrorMessage = (errMessage: UserErrorMessage) =>
    errorMessagesMap[errMessage.type]

export const HTTPStatusCodeToErrorMessageMap: {
    [code in number]?: keyof typeof errorMessagesMap;
} = {
    404: 'NOT_FOUND'
}

export const getErrorMessageByHTTPStatusCode = (statusCode: number) => {
    return HTTPStatusCodeToErrorMessageMap[statusCode]
}

export const hasErrorCode = (status: number) => (error: any) =>
    isAxiosError(error) && error.response?.status === status

export const isServerError = (e: AxiosError) => {
    if (e.response == null) {
        return false
    }
    const status = e.response.status
    return status >= 500
}

export const isClientError = (e: AxiosError) => {
    if (e.response == null) {
        return false
    }
    const status = e.response.status
    return status >= 400 && status < 500
}

export const isUnauthorizedError = hasErrorCode(401)
export const isForbiddenError = hasErrorCode(403)
export const isInternalServerError = hasErrorCode(403)

export const getUserErrorMessage = (e: unknown): UserErrorMessage => {
    if (!(e instanceof Error)) {
        return { type: 'UNEXPECTED_ERROR' }
    }

    if (e instanceof TypeError) {
        return { type: 'UNEXPECTED_ERROR' }
    }

    if (!isAxiosError(e)) {
        return { type: 'UNEXPECTED_ERROR' }
    }

    if ((e.response == null) || e.code === 'ERR_NETWORK') {
        return { type: 'CONNECTION_FAILURE' }
    }

    const messageType = getErrorMessageIfAxiosError(e)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (messageType) {
        return { type: messageType }
    }

    if (isServerError(e)) {
        return { type: 'SYSTEM_FAILURE' }
    }

    return { type: 'UNEXPECTED_ERROR' }
}

const getErrorMessageIfAxiosError = (e: AxiosError) => {
    if ((e.response?.status) != null) {
        return getErrorMessageByHTTPStatusCode(e.response.status)
    }
}
