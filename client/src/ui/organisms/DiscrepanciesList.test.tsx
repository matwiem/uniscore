import { render, screen } from '@testing-library/react'

import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { MemoryRouter } from 'react-router-dom'

const noop = () => undefined

test('renders \'no discrepancies \' when empty array given', () => {
    render(<MemoryRouter><DiscrepanciesList discrepancies={[]} handleIgnore={noop} handleResolve={noop} /></MemoryRouter>)

    const message = screen.getByText(/no discrepancies/i)

    expect(message).toBeInTheDocument()
})

test('renders all discrepancies', () => {
    render(<MemoryRouter><DiscrepanciesList discrepancies={discrepanciesJSON} handleIgnore={noop} handleResolve={noop} /></MemoryRouter>)

    const items = screen.getAllByTestId('discrepancy-card')

    expect(items).toHaveLength(discrepanciesJSON.length)
})
