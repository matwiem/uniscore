import { type Discrepancy } from '../../api/discrepancies'
import { Spinner } from '../../ui/molecules/Spinner'
import { AllDiscrepanciesView } from './AllDiscrepanciesView'
import { useDiscrepancies } from '../../utils/discrepancies/useDiscrepancies'

export const AllDiscrepancies: React.FC<Record<string, never>> = () => {
    const { query, handleResolve, handleIgnore } = useDiscrepancies()

    if (query.isLoading) {
        return <Spinner />
    }

    return (
        <AllDiscrepanciesView
            discrepancies={query.data as Discrepancy[]}
            onResolve={handleResolve}
            onIgnore={handleIgnore}
        />
    )
}
