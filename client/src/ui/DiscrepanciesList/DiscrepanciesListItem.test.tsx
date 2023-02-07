import { render, screen } from '@testing-library/react'
import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { DiscrepanciesListItem } from './DiscrepanciesListItem'

const discrepancy = discrepanciesJSON[0]

test('renders subject\'s ID', () => {
    render(<DiscrepanciesListItem discrepancy={discrepancy} />)
    const discrepancyID = screen.getByText(discrepancy.subjectId)
    expect(discrepancyID).toBeInTheDocument()
})

test('renders subject\'s type', () => {
    render(<DiscrepanciesListItem discrepancy={discrepancy} />)
    const discrepancyType = screen.getByText(discrepancy.subjectType)
    expect(discrepancyType).toBeInTheDocument()
})

test('renders change', () => {
    render(<DiscrepanciesListItem discrepancy={discrepancy} />)
    const property = screen.getByText(/property/i)
    expect(property).toBeInTheDocument()
    expect(property).toHaveTextContent(discrepancy.propertyChange.change.path)
    const value = screen.getByText(/change/i)
    expect(value).toBeInTheDocument()
    expect(value).toHaveTextContent(discrepancy.propertyChange.sourceValue.toString())
    expect(value).toHaveTextContent(discrepancy.propertyChange.change.value.toString())
})

test('renders action buttons', () => {
    render(<DiscrepanciesListItem discrepancy={discrepancy} />)
    const ignoreButton = screen.getByText(/ignore/i)
    expect(ignoreButton).toBeInTheDocument()
    const resolveButton = screen.getByText(/resolve/i)
    expect(resolveButton).toBeInTheDocument()
})
