import {
    Filters as RepositoryFilters,
    Discrepancy, DiscrepanciesRepository,
} from '@src/discrepancies/repository/repository'

export type Filters = RepositoryFilters

export interface DiscrepanciesService {
    discrepancies: (filters?: Filters) => Promise<Discrepancy[]>
}

export class DiscrepanciesServiceDemo implements DiscrepanciesService {
    private discrepanciesRepository: DiscrepanciesRepository

    constructor (discrepanciesRepository: DiscrepanciesRepository) {
        this.discrepanciesRepository = discrepanciesRepository
    }

    discrepancies (filters?: Filters): Promise<Discrepancy[]> {
        return this.discrepanciesRepository.discrepancies(filters)
    }
}
