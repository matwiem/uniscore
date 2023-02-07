import { rest } from 'msw'

import { EnvVars } from '../config'
import { type Discrepancy } from './discrepancies'

import mockJSON from './discrepancies.mock.json'
export const discrepanciesJSON = mockJSON as Discrepancy[]

export const discrepanciesMockHandler = [
    rest.get<never, never, Discrepancy[]>(`${EnvVars.BaseURL}/discrepancies`, (req, res, context) => {
        return res(context.json(discrepanciesJSON))
    })
]
