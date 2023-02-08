import { useQuery } from 'react-query'
import { type Discrepancy, getDiscrepancies } from '../../api/discrepancies'
import { Spinner } from '../../ui/molecules/Spinner'
import { AllDiscrepanciesView } from './AllDiscrepanciesView'

export const AllDiscrepancies: React.FC<Record<string, never>> = () => {
    const { isLoading, data } = useQuery('discrepancies', async () => await getDiscrepancies())

    if (isLoading) {
        return <Spinner />
    }

    return (
        <AllDiscrepanciesView discrepancies={data as Discrepancy[]} />
    )
}
