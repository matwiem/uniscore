import axios from 'axios'
import { EnvVars } from '../config'

export interface Discrepancy {
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
    const url = new URL(`${EnvVars.BaseURL}/discrepancies`)
    if (filters != null) {
        Object.entries(filters).forEach(([key, value]) => {
            url.searchParams.set(key, value)
        })
    }
    const response = await axios.get<Discrepancy[]>(url.toString())
    return response.data
}
