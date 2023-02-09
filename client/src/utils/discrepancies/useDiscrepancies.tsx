import { useQuery, useQueryClient } from 'react-query'
import { useCallback, useMemo } from 'react'
import { useToast } from '@chakra-ui/react'

import {
    type Discrepancy,
    type Filters,
    getDiscrepancies
} from '../../api/discrepancies'

export const useDiscrepancies = (filters?: Filters) => {
    const queryKey = useMemo(() => {
        const queryKeyBuilder = ['discrepancies']

        if (filters != null) {
            const { subjectId, subjectType } = filters

            if (subjectId != null) {
                queryKeyBuilder.push(subjectId)
            }

            if (subjectType != null) {
                queryKeyBuilder.push(subjectType)
            }
        }

        return queryKeyBuilder
    }, [filters])

    const queryFunction = useCallback(async () => await getDiscrepancies(filters), [filters])

    const query = useQuery(queryKey, queryFunction)

    const queryClient = useQueryClient()

    const toast = useToast()

    const handleResolve = useCallback((discrepancy: Discrepancy) => {
        toast({
            title: 'Discrepancy resolved.',
            description: `Successfully closed discrepancy ${discrepancy.id}.`,
            status: 'success',
            duration: 9000,
            isClosable: true
        })
        queryClient.setQueryData(queryKey, (oldData: undefined | Discrepancy[]) => {
            if (oldData != null) {
                return oldData.filter(d => d.id !== discrepancy.id)
            }
            return []
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryKey])

    const handleIgnore = useCallback((discrepancy: Discrepancy) => {
        toast({
            title: 'Discrepancy ignored.',
            description: `Ignoring discrepancy ${discrepancy.id}.`,
            status: 'info',
            duration: 9000,
            isClosable: true
        })
        queryClient.setQueryData(queryKey, (oldData: undefined | Discrepancy[]) => {
            if (oldData != null) {
                return oldData.filter(d => d.id !== discrepancy.id)
            }
            return []
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryKey])

    return useMemo(() => ({
        query,
        handleResolve,
        handleIgnore
    }), [handleIgnore, handleResolve, query])
}
