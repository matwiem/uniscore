import { type Discrepancy } from '../../api/discrepancies'
import { Container, Heading } from '@chakra-ui/react'
import { DiscrepanciesList } from '../../ui/organisms/DiscrepanciesList'

interface AllDiscrepanciesViewProps {
    discrepancies: Discrepancy[]
    onResolve: (discrepancy: Discrepancy) => void
    onIgnore: (discrepancy: Discrepancy) => void
}
export const AllDiscrepanciesView: React.FC<AllDiscrepanciesViewProps> = (props) => {
    const { discrepancies, onIgnore, onResolve } = props

    return (
        <Container>
            <Heading py={4}>All discrepancies</Heading>
            <DiscrepanciesList
                discrepancies={discrepancies}
                handleResolve={onResolve}
                handleIgnore={onIgnore}
            />
        </Container>
    )
}
