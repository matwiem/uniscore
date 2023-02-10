import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { MemoryRouter } from 'react-router-dom'

const componentMeta: ComponentMeta<typeof DiscrepanciesList> = {
    component: DiscrepanciesList
}

const noop = () => undefined

export const Empty: ComponentStory<typeof DiscrepanciesList> = () => <MemoryRouter><DiscrepanciesList discrepancies={[]} handleIgnore={noop} handleResolve={noop} /></MemoryRouter>

export const AllTypes: ComponentStory<typeof DiscrepanciesList> = () => <MemoryRouter><DiscrepanciesList discrepancies={discrepanciesJSON} handleIgnore={noop} handleResolve={noop} /></MemoryRouter>

export default componentMeta
