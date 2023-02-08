import { type Discrepancy } from '../../api/discrepancies'
import { Container, Heading } from '@chakra-ui/react'
import { DiscrepanciesList } from '../../ui/organisms/DiscrepanciesList'

interface AllDiscrepanciesViewProps {
    discrepancies: Discrepancy[]
}
export const AllDiscrepanciesView: React.FC<AllDiscrepanciesViewProps> = (props) => {
    const { discrepancies } = props

    return (
        <Container>
            <Heading py={4}>All discrepancies</Heading>
            <DiscrepanciesList discrepancies={discrepancies} />
        </Container>
    )
}
