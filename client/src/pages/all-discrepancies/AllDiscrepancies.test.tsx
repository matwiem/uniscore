import { setupServer } from 'msw/node'
import {
    render,
    screen,
    waitForElementToBeRemoved
} from '@testing-library/react'

import { AllDiscrepancies } from './AllDiscrepancies'
import {
    discrepanciesJSON,
    discrepanciesMockHandler
} from '../../api/discrepancies.mock'
import { AppProviders } from '../../AppProviders'

const server = setupServer(...discrepanciesMockHandler)

describe('AllDiscrepancies page', () => {
    beforeAll(() => {
        server.listen({
            onUnhandledRequest: 'error'
        })
    })
    beforeEach(() => { jest.useFakeTimers() })
    afterEach(() => { server.resetHandlers() })
    afterAll(() => { server.close() })

    test('fetches and renders all discrepancies', async () => {
        render(
            <AppProviders>
                <AllDiscrepancies/>
            </AppProviders>
        )

        const loader = screen.getByText(/loading/i)

        expect(loader).toBeInTheDocument()

        await waitForElementToBeRemoved(loader)

        const entries = screen.getAllByTestId('discrepancy-card')

        expect(entries).toHaveLength(discrepanciesJSON.length)
    })
})
