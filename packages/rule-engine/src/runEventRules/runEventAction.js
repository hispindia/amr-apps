import { getSection } from './getSection'
import { setColors } from './setColors'
import {
    SHOW_OPTION_GROUP,
    HIDE_FIELD,
    ASSIGN,
    SHOW_WARNING,
    SHOW_ERROR,
} from '../constants/actionTypes'

export const runEventAction = (
    values,
    {
        condition,
        dataElement,
        programStageSection,
        programRuleActionType,
        optionGroup,
        data,
        content,
    },
    { stage, optionSets, pushChanges, updateValue }
) => {
    const cond = eval(condition)
    const de = dataElement ? stage.dataElements[dataElement.id] : null
    const s = programStageSection
        ? getSection(programStageSection.id, stage.programStageSections)
        : null
    switch (programRuleActionType) {
        case SHOW_OPTION_GROUP:
            if (!cond || de.optionSet === optionGroup.id) break
            de.optionSet = optionGroup.id
            // Only reset selected value if the options do not include current value.
            if (
                !optionSets[de.optionSet].find(
                    option => option.value === values[de.id]
                ) &&
                values[de.id] !== ''
            ) {
                values[de.id] = ''
                if (pushChanges) updateValue(de.id, '')
            }
            break
        case HIDE_FIELD:
            if (cond === de.hide) break
            setColors(stage.dataElements, values, {
                condition: condition,
                affected: de,
            })
            de.hide = cond
            if (values[de.id] !== '') {
                values[de.id] = ''
                if (pushChanges) updateValue(de.id, '')
            }
            break
        case HIDE_FIELD:
            if (cond !== s.hide) s.hide = cond
            break
        case ASSIGN:
            if (!cond) break
            setColors(stage.dataElements, values, {
                condition: condition,
                affected: de,
                value: data,
            })
            // Assigning value.
            if (values[de.id] !== data) {
                values[de.id] = data
                if (pushChanges) updateValue(de.id, data)
            }
            de.disabled = true
            break
        case SHOW_WARNING:
            if (cond && de.warning !== content) de.warning = content
            else if (!cond && de.warning === content) de.warning = null
            break
        case SHOW_ERROR:
            if (cond && de.error !== content) de.error = content
            else if (!cond && de.error === content) de.error = null
            break
        default:
            break
    }
}
