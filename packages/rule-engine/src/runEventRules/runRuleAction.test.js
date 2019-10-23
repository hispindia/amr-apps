import { runRuleAction } from './runRuleAction'
import { dataElements, programStageSections, values } from '../__test__'
import { SHOW_OPTION_GROUP, HIDE_FIELD, ASSIGN } from '../constants/actionTypes'

const programStage = {
    dataElements,
    programStageSections,
}

describe('runRuleAction', () => {
    it('sets the option set', () => {
        const expected = 'id'
        const id = 'dRKIjwIDab4'
        const dataElement = programStage.dataElements[id]

        runRuleAction(
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

        runRuleAction(
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

        runRuleAction(
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

        runRuleAction(
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
})
