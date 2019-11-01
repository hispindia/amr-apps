import { initProgramStage } from './initProgramStage'
import { initValues } from './initValues'
import { initTrackedEntityAttributes } from './initTrackedEntityAttributes'
import { getEntityRules, getEventRules } from './programRules'
import { initOptionSets } from './initOptionSets'

const throwError = param => {
    const paramName = Object.keys(param)[0]
    throw new Error(`You must pass ${paramName} to function initData!`)
}

const validateParams = ({
    programStage,
    dataElements,
    programRules,
    programRuleVariables,
    dataValues,
}) => {
    if (!programStage) throwError({ programStage })
    if (!dataElements) throwError({ dataElements })
    if (!programRules) throwError({ programRules })
    if (!programRuleVariables) throwError({ programRuleVariables })
    if (!dataValues) throwError({ dataValues })
}

export const initData = (
    {
        programStage,
        dataElements,
        programRules,
        programRuleVariables,
        dataValues,
    },
    { options, optionSets, optionGroups, trackedEntityAttributes } = {}
) => {
    validateParams({
        programStage,
        dataElements,
        programRules,
        programRuleVariables,
        dataValues,
    })

    const newProgramStage = initProgramStage(programStage, dataElements)

    return {
        programStage: newProgramStage,
        values: initValues(
            dataValues,
            newProgramStage.programStage.dataElements
        ),
        trackedEntityAttributes: trackedEntityAttributes
            ? initTrackedEntityAttributes(trackedEntityAttributes)
            : null,
        trackedEntityProgramRules: trackedEntityAttributes
            ? getEntityRules(programRules, programRuleVariables)
            : null,
        eventProgramRules: getEventRules(programRules, programRuleVariables),
        optionSets: options
            ? initOptionSets(options, optionSets, optionGroups)
            : null,
    }
}
