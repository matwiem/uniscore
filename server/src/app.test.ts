import {Response} from "supertest";

const request = require("supertest")

import {app} from './app'

describe('GET /hello', function () {
    it('should send greetings', function () {
        return request(app)
            .get('/hello')
            .expect(200)
            .then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        greeting: "welcome"
                    })
                )
            })
    });
});