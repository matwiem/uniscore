import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { discrepanciesJSON } from '../../../api/discrepancies.mock'
import { DiscrepancyCard } from './DiscrepancyCard'

const discrepancy = discrepanciesJSON[0]

const componentMeta: ComponentMeta<typeof DiscrepancyCard> = {
    component: DiscrepancyCard
}

export const ReplaceValue: ComponentStory<typeof DiscrepancyCard> = () => <DiscrepancyCard discrepancy={discrepancy} />

export default componentMeta
