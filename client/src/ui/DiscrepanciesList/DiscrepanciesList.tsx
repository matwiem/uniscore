import { type Discrepancy } from '../../api/discrepancies'
import {
    Center,
    Text,
    VStack
} from '@chakra-ui/react'

import { DiscrepanciesListItem } from './DiscrepanciesListItem'

interface DiscrepanciesListProps {
    discrepancies: Discrepancy[]
}

export const DiscrepanciesList: React.FC<DiscrepanciesListProps> = (props) => {
    const { discrepancies } = props

    if (discrepancies.length === 0) {
        return <Center>
            <Text>No discrepancies found</Text>
        </Center>
    }
    return (<VStack>
        {discrepancies.map(discrepancy => <DiscrepanciesListItem
            key={`${discrepancy.subjectId}${discrepancy.propertyChange.change.path}`}
            discrepancy={discrepancy}/>)}
    </VStack>)
}
