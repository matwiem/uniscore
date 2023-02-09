import { useParams } from 'react-router-dom'
import { useDiscrepancies } from '../utils/discrepancies/useDiscrepancies'
import { Spinner } from '../ui/molecules/Spinner'
import { type Discrepancy } from '../api/discrepancies'
import { useEffect } from 'react'
import { DiscrepanciesView } from '../ui/templates/DiscrepanciesView'

export const PlayerDiscrepancies: React.FC<Record<string, never>> = () => {
    const { playerId } = useParams()
    const { query, handleResolve, handleIgnore } = useDiscrepancies({ subjectId: playerId })

    useEffect(() => {
        if (query.isError) {
            throw query.error
        }
    }, [query.error, query.isError])

    useEffect(() => {
        if (playerId == null) {
            throw new Error('Missing playerId')
        }
    }, [playerId])

    if (query.isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <DiscrepanciesView
            discrepancies={query.data as Discrepancy[]}
            heading={`Player ${playerId as string}`}
            onResolve={handleResolve}
            onIgnore={handleIgnore}
        />
    )
}
