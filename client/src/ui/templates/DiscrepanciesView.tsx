import { type Discrepancy } from '../../api/discrepancies'
import { Container, Heading } from '@chakra-ui/react'
import { DiscrepanciesList } from '../organisms/DiscrepanciesList'

interface DiscrepanciesViewProps {
    discrepancies: Discrepancy[]
    heading: string
    onResolve?: (discrepancy: Discrepancy) => void
    onIgnore?: (discrepancy: Discrepancy) => void
}
export const DiscrepanciesView: React.FC<DiscrepanciesViewProps> = (props) => {
    const { discrepancies, heading, onResolve, onIgnore } = props

    return (
        <Container>
            <Heading size='md' py={4}>{heading}</Heading>
            <DiscrepanciesList discrepancies={discrepancies} handleResolve={onResolve} handleIgnore={onIgnore} />
        </Container>
    )
}
