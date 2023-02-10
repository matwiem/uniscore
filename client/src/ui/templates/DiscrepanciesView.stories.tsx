import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { DiscrepanciesView } from './DiscrepanciesView'
import { discrepanciesJSON } from '../../api/discrepancies.mock'
import { MemoryRouter } from 'react-router-dom'

const componentMeta: ComponentMeta<typeof DiscrepanciesView> = {
    component: DiscrepanciesView
}

export const GenericDiscrepanciesView: ComponentStory<typeof DiscrepanciesView> = () => <MemoryRouter><DiscrepanciesView discrepancies={discrepanciesJSON} heading={'All Discrepancies'} /></MemoryRouter>

export default componentMeta
