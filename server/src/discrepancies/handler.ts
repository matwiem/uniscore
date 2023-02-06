import {
    NextFunction,
    Request,
    Response,
} from 'express'

import { DiscrepanciesService, Filters } from '@src/discrepancies/service'

type RequestQuery = Filters

export type QueryParam<P extends keyof RequestQuery> = keyof Pick<RequestQuery,P>

export interface DiscrepanciesHandler {
    get: (
        request: Request<unknown, unknown, unknown, RequestQuery>,
        response: Response,
        next: NextFunction
    ) => Promise<void>
}

export const makeHandler = (service: DiscrepanciesService): DiscrepanciesHandler => {
    return {
        get: async (req, res, next) => {
            try {
                const filters = req.query
                res.json(await service.discrepancies(filters))
            } catch (error: unknown) {
                next(error)
            }
        }
    }
}
