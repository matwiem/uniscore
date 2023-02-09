import { type Discrepancy } from '../api/discrepancies'
import { Spinner } from '../ui/molecules/Spinner'
import { useDiscrepancies } from '../utils/discrepancies/useDiscrepancies'
import { DiscrepanciesView } from '../ui/templates/DiscrepanciesView'
import { useEffect } from 'react'

export const AllDiscrepancies: React.FC<Record<string, never>> = () => {
    const { query, handleResolve, handleIgnore } = useDiscrepancies()

    useEffect(() => {
        if (query.isError) {
            throw query.error
        }
    }, [query.error, query.isError])

    if (query.isLoading) {
        return <Spinner />
    }

    return (
        <DiscrepanciesView
            heading={'All discrepancies'}
            discrepancies={query.data as Discrepancy[]}
            onResolve={handleResolve}
            onIgnore={handleIgnore}
        />
    )
}
