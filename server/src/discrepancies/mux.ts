import express, { Router } from 'express'
import { query } from 'express-validator'

import { DiscrepanciesHandler, QueryParam } from '@src/discrepancies/handler'
import { ALL_DISCREPANCY_SUBJECTS } from '@src/discrepancies/repository'

export const makeMux = (handler: DiscrepanciesHandler): Router => {
    const mux = express.Router()

    const subjectIdKey: QueryParam<'subjectId'> = 'subjectId'
    const subjectTypeKey: QueryParam<'subjectType'> = 'subjectType'
    mux.get(
        '/',
        query(subjectIdKey)
            .optional()
            .isString(),
        query(subjectTypeKey)
            .optional()
            .isIn(ALL_DISCREPANCY_SUBJECTS),
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        handler.get
    )

    return mux
}
