import { setupServer } from 'msw/node'
import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved, within
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

        const discrepancies = screen.getAllByTestId('discrepancy-card')

        expect(discrepancies).toHaveLength(discrepanciesJSON.length)
    })

    test('resolves first discrepancy', async () => {
        render(
            <AppProviders>
                <AllDiscrepancies/>
            </AppProviders>
        )

        const discrepancies = await screen.findAllByTestId('discrepancy-card')

        const resolveButton = within(discrepancies[0]).getByText(/resolve/i)

        fireEvent.click(resolveButton)

        await waitForElementToBeRemoved(discrepancies[0])

        await screen.findByText(/Successfully closed discrepancy/i)
    })
})
