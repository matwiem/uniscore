import { render, screen } from '@testing-library/react'
import { DiscrepanciesList } from './DiscrepanciesList'

test('renders \'no discrepancies\' message given empty discrepancies array', () => {
    render(<DiscrepanciesList discrepancies={[]} />)
    const message = screen.getByText(/no discrepancies/i)
    expect(message).toBeInTheDocument()
})
