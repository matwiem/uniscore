import { useParams } from 'react-router-dom'
import { useDiscrepancies } from '../utils/discrepancies/useDiscrepancies'
import { Spinner } from '../ui/molecules/Spinner'
import { type Discrepancy } from '../api/discrepancies'
import { useEffect } from 'react'
import { DiscrepanciesView } from '../ui/templates/DiscrepanciesView'

export const TeamDiscrepancies: React.FC<Record<string, never>> = () => {
    const { teamId } = useParams()
    const { query, handleResolve, handleIgnore } = useDiscrepancies({ subjectId: teamId })

    useEffect(() => {
        if (query.isError) {
            throw query.error
        }
    }, [query.error, query.isError])

    useEffect(() => {
        if (teamId == null) {
            throw new Error('Missing teamId')
        }
    }, [teamId])

    if (query.isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <DiscrepanciesView
            discrepancies={query.data as Discrepancy[]}
            heading={`Team ${teamId as string}`}
            onResolve={handleResolve}
            onIgnore={handleIgnore}
        />
    )
}
