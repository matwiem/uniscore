import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { DiscrepanciesView } from './DiscrepanciesView'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

const componentMeta: ComponentMeta<typeof DiscrepanciesView> = {
    component: DiscrepanciesView
}

export const GenericDiscrepanciesView: ComponentStory<typeof DiscrepanciesView> = () => <DiscrepanciesView discrepancies={discrepanciesJSON} heading={'All Discrepancies'} />

export default componentMeta
