import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { AllDiscrepanciesView } from './AllDiscrepanciesView'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

const componentMeta: ComponentMeta<typeof AllDiscrepanciesView> = {
    component: AllDiscrepanciesView
}

const noop = () => undefined

export const AllDiscrepancies: ComponentStory<typeof AllDiscrepanciesView> = () => <AllDiscrepanciesView discrepancies={discrepanciesJSON} onIgnore={noop} onResolve={noop} />

export default componentMeta
