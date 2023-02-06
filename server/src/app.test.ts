import { Response } from 'supertest'

const request = require("supertest")

import {app} from './app'

describe('GET /discrepancies', () => {
  it('GET /discrepancies should respond with status 200 OK', () => {
    return request(app)
      .get('/discrepancies')
      .expect(200)
  })

  it('GET /discrepancies should respond with an array of all discrepancies', () => {
    expect(false).toBe(true)
  })

  it('GET /discrepancies?subjectType=GAME should respond with an array of all discrepancies of type GAME', () => {
    expect(false).toBe(true)
  })

  it('GET /discrepancies?subjectType=TEAM should respond with an array of all discrepancies of type TEAM', () => {
    expect(false).toBe(true)
  })

  it('GET /discrepancies?subjectType=PLAYER should respond with an array of all discrepancies of type PLAYER', () => {
    expect(false).toBe(true)
  })

  it('GET /discrepancies?subjectType=INVALID should respond with 400 BAD_REQUEST', () => {
    return request(app)
      .get('/discrepancies?subjectType=INVALID')
      .expect(400)
  })

  it('GET /discrepancies?subjectType=INVALID should respond with an error object', () => {
    return request(app)
      .get('/discrepancies?subjectType=INVALID')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: Response) => {
        expect(res.body)
          .toEqual(expect.objectContaining({
            message: "Invalid value for parameter 'subjectType'. Received 'INVALID', expected 'GAME' | 'TEAM' | 'PLAYER'."
          }))
      })
  })

  it('GET /discrepancies?subjectId=game1 should respond with an array of all discrepancies for subject with id=game1', () => {
    expect(false).toBe(true)
  })

  it('GET /discrepancies?subjectId=nosuchsubject should respond with an empty array', () => {
    return request(app)
      .get('/discrepancies?subjectId=nosuchsubject')
      .expect('Content-Type', /json/)
      .then((res: Response) => {
        expect(res.body)
          .toEqual([])
      })
  })
})
