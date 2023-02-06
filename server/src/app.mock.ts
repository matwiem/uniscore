import { createMockRepositoryMemory } from '@src/discrepancies/repository.mock'
import { DiscrepanciesServiceDemo } from '@src/discrepancies/service'
import { makeHandler } from '@src/discrepancies/handler'
import { makeMux } from '@src/discrepancies/mux'
import { makeApp } from '@src/app'

export const createMockApp = async () => {
    const discrepancyRepository = await createMockRepositoryMemory()
    const discrepancyService = new DiscrepanciesServiceDemo(discrepancyRepository)
    const discrepancyHandler = makeHandler(discrepancyService)
    const discrepancyMux = makeMux(discrepancyHandler)
    return makeApp(discrepancyMux)
}
