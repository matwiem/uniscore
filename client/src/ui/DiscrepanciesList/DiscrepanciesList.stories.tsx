import React from 'react'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

const componentMeta: ComponentMeta<typeof DiscrepanciesList> = {
    title: 'DiscrepanciesList',
    component: DiscrepanciesList
}

export const Empty: ComponentStory<typeof DiscrepanciesList> = () => <DiscrepanciesList discrepancies={[]} />

export const WithEntries: ComponentStory<typeof DiscrepanciesList> = () => <DiscrepanciesList discrepancies={discrepanciesJSON} />

export default componentMeta
