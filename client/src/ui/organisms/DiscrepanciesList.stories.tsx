import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { DiscrepanciesList } from './DiscrepanciesList'
import { discrepanciesJSON } from '../../api/discrepancies.mock'

const componentMeta: ComponentMeta<typeof DiscrepanciesList> = {
    component: DiscrepanciesList
}

const noop = () => undefined

export const Empty: ComponentStory<typeof DiscrepanciesList> = () => <DiscrepanciesList discrepancies={[]} handleIgnore={noop} handleResolve={noop} />

export const AllTypes: ComponentStory<typeof DiscrepanciesList> = () => <DiscrepanciesList discrepancies={discrepanciesJSON} handleIgnore={noop} handleResolve={noop} />

export default componentMeta
