import { type ComponentMeta } from '@storybook/react'
import { ErrorMessage } from './ErrorMessage'

const componentMeta: ComponentMeta<typeof ErrorMessage> = {
    component: ErrorMessage
}

export const UNEXPECTED_ERROR = () => <ErrorMessage message={{ type: 'UNEXPECTED_ERROR' }} />
export const CONNECTION_FAILURE = () => <ErrorMessage message={{ type: 'CONNECTION_FAILURE' }} />
export const NOT_FOUND = () => <ErrorMessage message={{ type: 'NOT_FOUND' }} />
export const SYSTEM_FAILURE = () => <ErrorMessage message={{ type: 'SYSTEM_FAILURE' }} />

export default componentMeta
