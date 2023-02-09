import { type Discrepancy } from '../../api/discrepancies'
import { Center, Text, VStack } from '@chakra-ui/react'
import { DiscrepancyCard } from '../molecules/DiscrepancyCard'

interface DiscrepanciesListProps {
    discrepancies: Discrepancy[]
    handleResolve?: (discrepancy: Discrepancy) => void
    handleIgnore?: (discrepancy: Discrepancy) => void
}
export const DiscrepanciesList: React.FC<DiscrepanciesListProps> = (props) => {
    const { discrepancies, handleResolve, handleIgnore } = props

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
                <DiscrepancyCard
                    key={discrepancy.id}
                    discrepancy={discrepancy}
                    onResolve={handleResolve}
                    onIgnore={handleIgnore}
                />
            )}
        </VStack>
    )
}
