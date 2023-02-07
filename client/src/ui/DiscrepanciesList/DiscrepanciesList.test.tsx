import { render, screen } from '@testing-library/react'
import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

test('renders \'no discrepancies\' message given empty discrepancies array', () => {
    render(<DiscrepanciesList discrepancies={[]} />)
    const message = screen.getByText(/no discrepancies/i)
    expect(message).toBeInTheDocument()
})

test('renders subject\'s ID for every discrepancy', () => {
    render(<DiscrepanciesList discrepancies={discrepanciesJSON} />)
    for (const discrepancy of discrepanciesJSON) {
        const discrepancyID = screen.getByText(discrepancy.subjectId)
        expect(discrepancyID).toBeInTheDocument()
    }
})

test('renders subject\'s type for every discrepancy', () => {
    render(<DiscrepanciesList discrepancies={discrepanciesJSON} />)
    for (const discrepancy of discrepanciesJSON) {
        const discrepancyType = screen.getByText(discrepancy.subjectType)
        expect(discrepancyType).toBeInTheDocument()
    }
})

test('renders change for every discrepancy', () => {
    render(<DiscrepanciesList discrepancies={discrepanciesJSON} />)
    for (const discrepancy of discrepanciesJSON) {
        const changeType = screen.getByText(discrepancy.propertyChange.change.op)
        expect(changeType).toBeInTheDocument()
        const changePath = screen.getByText(discrepancy.propertyChange.change.path)
        expect(changePath).toBeInTheDocument()
        const sourceValue = screen.getByText(discrepancy.propertyChange.sourceValue)
        expect(sourceValue).toBeInTheDocument()
        const targetValue = screen.getByText(discrepancy.propertyChange.change.value)
        expect(targetValue).toBeInTheDocument()
    }
})

test('renders action buttons for every discrepancy', () => {
    render(<DiscrepanciesList discrepancies={discrepanciesJSON} />)
    const ignoreButtons = screen.getAllByText(/ignore/i)
    expect(ignoreButtons).toHaveLength(discrepanciesJSON.length)
    const resolveButtons = screen.getAllByText(/resolve/i)
    expect(resolveButtons).toHaveLength(discrepanciesJSON.length)
})
