import { initData } from './initData'

const programStage = true
const dataElements = true
const programRules = true
const programRuleVariables = true
const trackedEntityAttributes = true

describe('initData', () => {
    it('throws an error when programStage is missing', () => {
        const expected = new Error(
            `You must pass programStage to function initData!`
        )
        const actual = () => initData({})

        return expect(actual).toThrow(expected)
    })

    it('throws the correct error when dataElements is missing', () => {
        const expected = new Error(
            `You must pass dataElements to function initData!`
        )
        const actual = () => initData({ programStage })

        return expect(actual).toThrow(expected)
    })

    it('throws the correct error when programRules is missing', () => {
        const expected = new Error(
            `You must pass programRules to function initData!`
        )
        const actual = () => initData({ programStage, dataElements })

        return expect(actual).toThrow(expected)
    })

    it('throws the correct error when programRuleVariables is missing', () => {
        const expected = new Error(
            `You must pass programRuleVariables to function initData!`
        )
        const actual = () =>
            initData({ programStage, dataElements, programRules })

        return expect(actual).toThrow(expected)
    })

    it('throws an error when dataValues is missing', () => {
        const expected = new Error(
            `You must pass dataValues to function initData!`
        )
        const actual = () =>
            initData({
                programStage,
                dataElements,
                programRules,
                programRuleVariables,
            })

        return expect(actual).toThrow(expected)
    })
})
