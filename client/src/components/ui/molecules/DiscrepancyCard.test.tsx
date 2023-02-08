import { render, screen } from '@testing-library/react'

import { discrepanciesJSON } from '../../../api/discrepancies.mock'
import { DiscrepancyCard } from './DiscrepancyCard'

const discrepancy = discrepanciesJSON[0]

test('renders subject\'s ID', () => {
    render(<DiscrepancyCard discrepancy={discrepancy} />)

    const id = screen.getByText(discrepancy.subjectId)

    expect(id).toBeInTheDocument()
})

test('renders subject\'s type', () => {
    render(<DiscrepancyCard discrepancy={discrepancy} />)

    const type = screen.getByText(discrepancy.subjectType)

    expect(type).toBeInTheDocument()
})

test('renders change', () => {
    render(<DiscrepancyCard discrepancy={discrepancy} />)

    const path = screen.getByText(new RegExp(discrepancy.propertyChange.change.path))

    expect(path).toBeInTheDocument()

    const sourceValue = screen.getByText(new RegExp(discrepancy.propertyChange.sourceValue.toString()))

    expect(sourceValue).toBeInTheDocument()
})

test('renders action buttons', () => {
    render(<DiscrepancyCard discrepancy={discrepancy} />)

    const ignoreButton = screen.getByText(/ignore/i)

    expect(ignoreButton).toBeInTheDocument()

    const resolveButton = screen.getByText(/resolve/i)

    expect(resolveButton).toBeInTheDocument()
})
