import { ParserSR } from './parser.sr'
import { InvalidDTOFormat } from './errors'
import { gameDtoSr } from './parser.sr.mock'

describe('ParserSR', () => {
    it('should parse game DTO', function () {
        const parser = new ParserSR()
        const game = parser.parse(gameDtoSr)
        expect(game).toMatchSnapshot()
    })

    it('should throw UnsupportedDTOFormat', function () {
        const parser = new ParserSR()
        expect(() => {
            parser.parse({})
        }).toThrow(InvalidDTOFormat)
    })
})
