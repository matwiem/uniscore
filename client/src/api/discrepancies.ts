import axios from 'axios'
import { EnvVars } from '../config'

export interface Discrepancy {
    id: string
    subjectId: string
    subjectType: 'GAME' | 'TEAM' | 'PLAYER'
    parentId: string | null
    eventMeta: {
        gameId: string
        homeTeamId: string
        awayTeamId: string
    }
    propertyChange: {
        sourceValue: string | number
        change: {
            path: string
            op: 'replace'
            value: string | number
        }
    }
}

export type Filters = Partial<Pick<Discrepancy, 'subjectId' | 'subjectType'>>

export const getDiscrepancies = async (filters?: Filters) => {
    const response = await axios.get<Discrepancy[]>(`${EnvVars.BaseURL}/discrepancies`, {
        params: filters
    })
    return response.data
}
