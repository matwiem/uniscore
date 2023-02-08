import { type Discrepancy } from '../../../api/discrepancies'
import { Center, Text, VStack } from '@chakra-ui/react'
import { DiscrepancyCard } from '../molecules/DiscrepancyCard'

interface DiscrepanciesListProps {
    discrepancies: Discrepancy[]
}
export const DiscrepanciesList: React.FC<DiscrepanciesListProps> = (props) => {
    const { discrepancies } = props

    if (discrepancies.length === 0) {
        return (
            <Center>
                <Text>No discrepancies found.</Text>
            </Center>
        )
    }

    return (
        <VStack>
            {discrepancies.map((discrepancy) =>
                <DiscrepancyCard key={discrepancy.id} discrepancy={discrepancy} />
            )}
        </VStack>
    )
}
