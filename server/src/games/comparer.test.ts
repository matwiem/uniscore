import { ComparerDemo } from './comparer'
import { mockGameExternal, mockGameSr } from './repository.mock'

describe(`ComparerDemo`, () => {
    it(`should find all discrepancies between game representations`, async () => {
        const comparer = new ComparerDemo()
        comparer.setSourceGame(mockGameSr)
        mockGameExternal.accept(comparer)
        const discrepancies = comparer.getDiscrepancies()
        expect(discrepancies)
            .toMatchSnapshot()
    })
})
