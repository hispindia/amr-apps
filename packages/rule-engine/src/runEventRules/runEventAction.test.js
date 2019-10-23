import { runEventAction } from './runEventAction'
import { dataElements, programStageSections, values } from '../__test__'
import {
    SHOW_OPTION_GROUP,
    HIDE_FIELD,
    ASSIGN,
    SHOW_WARNING,
    SHOW_ERROR,
} from '../constants/actionTypes'

const programStage = {
    dataElements,
    programStageSections,
}

describe('runEventAction', () => {
    it('sets the option set and calls updateValue', () => {
        const expected = 'id'
        const id = 'dRKIjwIDab4'
        const dataElement = programStage.dataElements[id]

        runEventAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_OPTION_GROUP,
                optionGroup: { id: expected },
            },
            {
                stage: programStage,
                optionSets: { [dataElement.optionSet]: [], [expected]: [] },
            }
        )

        return expect(dataElement.optionSet).toEqual(expected)
    })

    it('hides the field', () => {
        const id = 'dRKIjwIDab4'
        const dataElement = programStage.dataElements[id]

        runEventAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: HIDE_FIELD,
            },
            {
                stage: programStage,
            }
        )

        return expect(dataElement.hide).toEqual(true)
    })

    it('shows the field', () => {
        const id = 'CqyqhAIuUSP'
        const dataElement = programStage.dataElements[id]

        runEventAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: HIDE_FIELD,
            },
            {
                stage: programStage,
            }
        )

        return expect(dataElement.hide).toEqual(false)
    })

    it('assigns the value', () => {
        const id = 'CqyqhAIuUSP'
        const expected = 'data'

        runEventAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: ASSIGN,
                data: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(values[id]).toEqual(expected)
    })

    it('sets the warning', () => {
        const id = 'CqyqhAIuUSP'
        const expected = 'warning'

        runEventAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_WARNING,
                content: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.dataElements[id].warning).toEqual(expected)
    })

    it('removes the warning', () => {
        const id = 'CqyqhAIuUSP'
        const warning = 'warning'

        programStage.dataElements[id].warning = warning

        runEventAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: SHOW_WARNING,
                content: warning,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.dataElements[id].warning).toEqual(null)
    })

    it('sets the error', () => {
        const id = 'CqyqhAIuUSP'
        const expected = 'error'

        runEventAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_ERROR,
                content: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.dataElements[id].error).toEqual(expected)
    })

    it('removes the error', () => {
        const id = 'CqyqhAIuUSP'
        const error = 'error'

        programStage.dataElements[id].error = error

        runEventAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: SHOW_ERROR,
                content: error,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.dataElements[id].error).toEqual(null)
    })
})
