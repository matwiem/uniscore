import { render, screen } from '@testing-library/react'

import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

test('renders \'no discrepancies \' when empty array given', () => {
    render(<DiscrepanciesList discrepancies={[]} />)

    const message = screen.getByText(/no discrepancies/i)

    expect(message).toBeInTheDocument()
})

test('renders all discrepancies', () => {
    render(<DiscrepanciesList discrepancies={discrepanciesJSON} />)

    const items = screen.getAllByTestId('discrepancy-card')

    expect(items).toHaveLength(discrepanciesJSON.length)
})
