import { DiscrepanciesServiceDemo } from './service'
import {
  createMockRepositoryMemory,
  mockDiscrepancies,
} from './repository.mock'

describe('DiscrepanciesServiceDemo', () => {
  it(`should return discrepancies`, async () => {
    const discrepanciesRepository = await createMockRepositoryMemory()
    const service = new DiscrepanciesServiceDemo(discrepanciesRepository)
    const discrepancies = await service.discrepancies()
    expect(discrepancies).toHaveLength(mockDiscrepancies.length)
  })

  it(`should apply filtering`, async () => {
    const discrepanciesRepository = await createMockRepositoryMemory()
    const service = new DiscrepanciesServiceDemo(discrepanciesRepository)
    const discrepancies = await service.discrepancies({
      subjectType: 'GAME'
    })
    expect(discrepancies).toHaveLength(1)
  })
})
