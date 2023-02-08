/* eslint-disable jest/no-jasmine-globals,jest/no-conditional-expect */
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import axios from 'axios'

import { getUserErrorMessage } from './error-messages'

const handlers = [
    rest.get('/mocks/errors/500', (req, res, context) => {
        return res(context.status(500, 'Internal Server Error'))
    }),
    rest.get('/mocks/errors/404', (req, res, context) => {
        return res(context.status(404, 'Not Found'))
    }),
    rest.get('/mocks/errors/network', (req, res, context) => {
        res.networkError('Network Error')
    })
]

const server = setupServer(...handlers)

describe('getUserErrorMessage', () => {
    beforeAll(() => {
        server.listen({
            onUnhandledRequest: 'error'
        })
    })
    beforeEach(() => { server.resetHandlers() })
    afterAll(() => { server.close() })

    it('should produce UNEXPECTED_ERROR if a non-error was thrown', () => {
        expect(getUserErrorMessage(1)).toMatchInlineSnapshot(`
      Object {
        "type": "UNEXPECTED_ERROR",
      }
    `)
    })

    it('should produce UNEXPECTED_ERROR if a TypeError was thrown', () => {
        const error = new TypeError('undefined is not a function')
        expect(getUserErrorMessage(error)).toMatchInlineSnapshot(`
      Object {
        "type": "UNEXPECTED_ERROR",
      }
    `)
    })

    it('should produce CONNECTION_FAILURE if a HTTP NetworkError was thrown', async () => {
        try {
            await axios.get('/mocks/errors/network')
            fail(
                "error should be thrown, if it's not then probably HTTP is misconfigured"
            )
        } catch (error: unknown) {
            expect(getUserErrorMessage(error)).toMatchInlineSnapshot(`
        Object {
          "type": "CONNECTION_FAILURE",
        }
      `)
        }
    })

    const testcases = [
        ['SYSTEM_FAILURE', 500],
        ['NOT_FOUND', 404]
    ]

    it.each(testcases)('should produce %s if a HTTP %s was thrown', async (errorMessage, statusCode) => {
        try {
            await axios.get(`/mocks/errors/${statusCode}`)
            fail("error should be thrown, if it's not then probably HTTP is misconfigured")
        } catch (error: unknown) {
            expect(getUserErrorMessage(error)).toMatchSnapshot()
        }
    })
})
