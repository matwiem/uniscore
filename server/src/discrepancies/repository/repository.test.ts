import { DiscrepanciesRepositoryMemory, DiscrepancySubject } from './repository'
import {
  createMockRepositoryMemory,
  mockDiscrepancies, mockDiscrepancyGame,
} from './repository.mock'
import { InvalidFilterError } from '../errors'

describe('DiscrepanciesRepositoryMemory', () => {
  it('should insert and store a discrepancies', async () => {
    const repository = await createMockRepositoryMemory()
    const discrepancies = await repository.discrepancies()
    expect(discrepancies).toHaveLength(mockDiscrepancies.length)
  })

  it(`should apply 'subjectType' filtering`, async () => {
    const repository = await createMockRepositoryMemory()
    const filtered = await repository.discrepancies({
      subjectType: 'GAME'
    })
    expect(filtered).toHaveLength(1)
    expect(filtered[0].subjectId).toEqual(mockDiscrepancyGame.subjectId)
  })

  it(`should apply 'subjectId' filtering`, async () => {
    const repository = await createMockRepositoryMemory()
    const filtered = await repository.discrepancies({
      subjectId: mockDiscrepancyGame.subjectId
    })
    expect(filtered).toHaveLength(1)
    expect(filtered[0].subjectId).toEqual(mockDiscrepancyGame.subjectId)
  })

  it('should return an empty array when given nonexistent subjectId', async () => {
    const repository = await createMockRepositoryMemory()
    const filtered = await repository.discrepancies({
      subjectId: "nosuchid"
    })
    expect(filtered).toHaveLength(0)
  })

  it(`should throw 'InvalidFilterError' when given invalid filter`, async () => {
    const repository = await createMockRepositoryMemory()
    try {
      await repository.discrepancies({
        subjectType: 'INVALID' as DiscrepancySubject
      })
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(InvalidFilterError)
    }
  })
})
