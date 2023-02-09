import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDiscrepancies } from '../utils/discrepancies/useDiscrepancies'
import { Spinner } from '../ui/molecules/Spinner'
import { DiscrepanciesView } from '../ui/templates/DiscrepanciesView'
import { type Discrepancy } from '../api/discrepancies'

export const GameDiscrepancies: React.FC<Record<string, never>> = () => {
    const { gameId } = useParams()
    const { query, handleResolve, handleIgnore } = useDiscrepancies({ subjectId: gameId, subjectType: 'dupa' as any })

    useEffect(() => {
        if (query.isError) {
            throw query.error
        }
    }, [query.error, query.isError])

    useEffect(() => {
        if (gameId == null) {
            throw new Error('Missing gameId')
        }
    }, [gameId])

    if (query.isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <DiscrepanciesView
            discrepancies={query.data as Discrepancy[]}
            heading={`Game ${gameId as string}`}
            onResolve={handleResolve}
            onIgnore={handleIgnore}
        />
    )
}
