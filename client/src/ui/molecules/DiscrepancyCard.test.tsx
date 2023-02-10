import { fireEvent, render, screen } from '@testing-library/react'

import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { DiscrepancyCard } from './DiscrepancyCard'
import { MemoryRouter } from 'react-router-dom'

const discrepancy = discrepanciesJSON[0]

test('renders subject\'s ID', () => {
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} /></MemoryRouter>)

    const id = screen.getByText(discrepancy.subjectId)

    expect(id).toBeInTheDocument()
})

test('renders subject\'s type', () => {
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} /></MemoryRouter>)

    const type = screen.getByText(discrepancy.subjectType)

    expect(type).toBeInTheDocument()
})

test('renders change', () => {
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} /></MemoryRouter>)

    const path = screen.getByText(new RegExp(discrepancy.propertyChange.change.path))

    expect(path).toBeInTheDocument()

    const sourceValue = screen.getByText(new RegExp(discrepancy.propertyChange.sourceValue.toString()))

    expect(sourceValue).toBeInTheDocument()
})

test('renders action buttons', () => {
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} /></MemoryRouter>)

    const ignoreButton = screen.getByText(/ignore/i)

    expect(ignoreButton).toBeInTheDocument()

    const resolveButton = screen.getByText(/resolve/i)

    expect(resolveButton).toBeInTheDocument()
})

test('triggers \'onResolve\' when resolve button clicked', () => {
    const onResolveMock = jest.fn()
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} onResolve={onResolveMock} /></MemoryRouter>)

    const resolveButton = screen.getByText(/resolve/i)

    fireEvent.click(resolveButton)

    expect(onResolveMock).toHaveBeenCalledTimes(1)
    expect(onResolveMock.mock.calls[0][0]).toEqual(discrepancy)
})
test('triggers \'onIgnore\' when ignore button clicked', () => {
    const onIgnoreMock = jest.fn()
    render(<MemoryRouter><DiscrepancyCard discrepancy={discrepancy} onIgnore={onIgnoreMock} /></MemoryRouter>)

    const ignoreButton = screen.getByText(/ignore/i)

    fireEvent.click(ignoreButton)

    expect(onIgnoreMock).toHaveBeenCalledTimes(1)
    expect(onIgnoreMock.mock.calls[0][0]).toEqual(discrepancy)
})
