import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { DiscrepancyCard } from './DiscrepancyCard'
import { MemoryRouter } from 'react-router-dom'

const discrepancy = discrepanciesJSON[0]

const componentMeta: ComponentMeta<typeof DiscrepancyCard> = {
    component: DiscrepancyCard
}

export const ReplaceValue: ComponentStory<typeof DiscrepancyCard> = () => <MemoryRouter><DiscrepancyCard discrepancy={discrepancy} /></MemoryRouter>

export default componentMeta
