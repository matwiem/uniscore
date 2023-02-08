import { Operation } from 'fast-json-patch'
import { v4 as uuid } from 'uuid'
import { InvalidFilterError } from '@src/discrepancies/errors'

export type NodeID = string

export const ALL_DISCREPANCY_SUBJECTS = ['GAME', 'TEAM', 'PLAYER'] as const
type DiscrepancySubjectTuple = typeof ALL_DISCREPANCY_SUBJECTS
export type DiscrepancySubject = DiscrepancySubjectTuple[number]

export type EventMeta = {
    gameId: NodeID
    homeTeamId: NodeID
    awayTeamId: NodeID
}

export type Change = Operation

export interface PropertyChange {
    sourceValue: unknown
    change: Change
}

export interface Discrepancy {
    id: string
    subjectId: NodeID
    subjectType: DiscrepancySubject
    parentId: NodeID | null
    eventMeta: EventMeta
    propertyChange: PropertyChange
}

export type NewDiscrepancy = Omit<Discrepancy, 'id'>

export type Filters = Partial<Pick<Discrepancy, "subjectId" | "subjectType">>

export interface DiscrepanciesRepository {
    discrepancies: (filters?: Filters) => Promise<Discrepancy[]>
    insert: (discrepancy: NewDiscrepancy) => Promise<void>
    insertMany: (discrepancies: NewDiscrepancy[]) => Promise<void>
}

export class DiscrepanciesRepositoryMemory implements DiscrepanciesRepository {
    private discrepanciesStore: Discrepancy[] = []

    discrepancies (filters?: Filters): Promise<Discrepancy[]> {
        if (filters) {
            validateFilters(filters)
            return Promise.resolve(this.discrepanciesStore.filter(this.apply(filters)))
        }
        return Promise.resolve([...this.discrepanciesStore])
    }

    insert (discrepancy: NewDiscrepancy): Promise<void> {
        this.discrepanciesStore.push({id: uuid(), ...discrepancy})
        return Promise.resolve(undefined)
    }

    async insertMany (discrepancies: NewDiscrepancy[]): Promise<void> {
        for (const discrepancy of discrepancies) {
            await this.insert(discrepancy)
        }
        return Promise.resolve(undefined)
    }

    private apply = (filters: Filters) => (discrepancy: Discrepancy): boolean => {
        const { subjectId, subjectType } = filters

        if (subjectId && discrepancy.subjectId !== subjectId) {
            return false
        }

        if (subjectType && discrepancy.subjectType !== subjectType) {
            return false
        }

        return true
    }
}

const validateFilters = (filters: Filters): void => {
    if (filters) {
        const { subjectType } = filters
        if (subjectType && !ALL_DISCREPANCY_SUBJECTS.includes(subjectType)) {
            throw new InvalidFilterError('subjectType', subjectType, ALL_DISCREPANCY_SUBJECTS.join(' | '))
        }
    }
}
