import { InvalidDTOFormat } from './errors'
import { ParserExternal } from './parser.external'
import { gameDtoExternal } from './parser.external.mock'

describe('ParserExternal', () => {
    it('should parse game DTO', function () {
        const parser = new ParserExternal()
        const game = parser.parse(gameDtoExternal)
        expect(game).toMatchSnapshot()
    })

    it('should throw UnsupportedDTOFormat', function () {
        const parser = new ParserExternal()
        expect(() => {
            parser.parse({})
        }).toThrow(InvalidDTOFormat)
    })
})
