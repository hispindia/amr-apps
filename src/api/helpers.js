import { get } from './crud'

const _organismsDataElementId = 'SaQe2REkGVw'
const _amrDataElement = 'lIkk661BLpG'

export const getProgramStage = async (programStageId, values) => {
    const shouldDisable = element => {
        switch (element.id) {
            case _amrDataElement:
            case _organismsDataElementId:
                return true
            default:
                return false
            /*typeof eventId === 'undefined'
                        ? false
                        : _isL2User && values[_l2ApprovalStatus] !== 'Approved'
                        ? false
                        : _isL1User && values[_l1ApprovalStatus] !== 'Approved'
                        ? false
                        : values[_l2ApprovalStatus] === 'Resend' ||
                          values[_l1ApprovalStatus] === 'Resend'
                        ? false
                        : false*/
        }
    }

    let programStage = await get(
        'programStages/' +
            programStageId +
            '.json?fields=displayName,programStageDataElements[dataElement[id,formName],compulsory],' +
            'programStageSections[id,name,displayName,renderType,dataElements[id,displayFormName,code,valueType,optionSetValue,' +
            'optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]'
    )

    programStage.programStageSections.forEach(section => {
        section.hide = false
        section.dataElements.forEach(dataElement => {
            // Adding required property.
            dataElement.required = programStage.programStageDataElements.find(
                programStageDataElement =>
                    programStageDataElement.dataElement.id === dataElement.id
            ).compulsory
            dataElement.hide = false
            // Adding options.
            if (dataElement.optionSetValue) {
                let options = []
                dataElement.optionSet.options.forEach(option =>
                    options.push({
                        value: option.code,
                        label: option.displayName,
                    })
                )
                dataElement.optionSet.options = options
            }
            dataElement.disabled = shouldDisable(dataElement)
            // Adding missing values.
            if (!values[dataElement.id]) values[dataElement.id] = ''
        })
    })

    let remove = []
    // Adding child sections and removing child sections from main sections.
    programStage.programStageSections.forEach(programStageSection => {
        let childSections = []
        programStage.programStageSections
            .filter(childSection =>
                childSection.name.match(
                    new RegExp('{' + programStageSection.name + '}.*')
                )
            )
            .forEach(childSection => {
                remove.push(childSection.id)
                childSection.name = childSection.name.replace(
                    new RegExp('{' + programStageSection.name + '}'),
                    ''
                )
                childSections.push(childSection)
            })
        programStageSection.childSections = childSections
    })

    programStage.programStageSections = programStage.programStageSections.filter(
        section => !remove.includes(section.id)
    )

    return programStage
}

/**
 * Gets AMR program rules.
 * @returns {Object} Object with data element and section rules.
 */
export const getProgramRules = async (programId, programStageId) => {
    // Replaces '#{xxx}' with 'this.state.values['id of xxx']'
    const getCondition = condition => {
        const original = condition
        try {
            const variableDuplicated = condition.match(/#\{.*?\}/g)
            let variables = []
            if (!variableDuplicated) return condition
            variableDuplicated.forEach(duplicated => {
                if (variables.indexOf(duplicated) === -1)
                    variables.push(duplicated)
            })
            variables.forEach(variable => {
                const name = variable.substring(2, variable.length - 1)
                const id = programRuleVariables.find(
                    ruleVariable => ruleVariable.name === name
                ).dataElement.id
                condition = condition.replace(
                    new RegExp('#{' + name + '}', 'g'),
                    "values['" + id + "']"
                )
            })
        } catch {
            console.warn('Improper condition:', original)
        }
        return condition
    }

    // Program specific dataElement rules.
    let dataElementRules = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[dataElement[id,name],data,programRuleActionType,optionGroup[id,options[' +
            'code,displayName]]&filter=programRuleActions.dataElement:!null&filter=programStage:null&order=priority:asc&' +
            'filter=programRuleActions.programRuleActionType:in:[SHOWOPTIONGROUP,HIDEFIELD,ASSIGN]&filter=program.id:eq:' +
            programId
    )).programRules

    // ProgramStage specific dataElement rules.
    let dataElementRulesStage = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[dataElement[id,name],data,programRuleActionType,optionGroup[id,options[' +
            'code,displayName]]&filter=programRuleActions.dataElement:!null&filter=programRuleActions.programRuleActionType:in:[' +
            'SHOWOPTIONGROUP,HIDEFIELD,ASSIGN]&order=priority:asc&&filter=programStage.id:eq:' +
            programStageId
    )).programRules

    // Program specific section rules.
    let sectionRules = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[programStageSection[name,id],programRuleActionType]' +
            '&filter=programRuleActions.programStageSection:!null&filter=programStage:null&filter=' +
            'programRuleActions.programRuleActionType:eq:HIDESECTION&order=priority:asc&&filter=program.id:eq:' +
            programId
    )).programRules

    // ProgramStage specific section rules.
    let sectionRulesStage = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[programStageSection[name,id],programRuleActionType]' +
            '&filter=programRuleActions.programStageSection:!null&programRuleActions.programRuleActionType:eq:' +
            'HIDESECTION&order=priority:asc&&filter=programStage.id:eq:' +
            programStageId
    )).programRules

    const programRuleVariables = (await get(
        'programRuleVariables.json?paging=false&fields=name,dataElement&filter=program.id:eq:' +
            programId
    )).programRuleVariables

    let rules = dataElementRules.concat(
        sectionRules,
        dataElementRulesStage,
        sectionRulesStage
    )
    rules.forEach(rule => {
        rule.condition = getCondition(rule.condition)
        rule.programRuleActions.forEach(programRuleAction => {
            if (programRuleAction.programRuleActionType === 'SHOWOPTIONGROUP') {
                let options = []
                // For some reason there are duplicates in the option group. Organisms only?
                programRuleAction.optionGroup.options.forEach(option => {
                    if (!options.find(o => o.value === option.code))
                        options.push({
                            value: option.code,
                            label: option.displayName,
                        })
                })
                programRuleAction.optionGroup.options = options
            }
        })
    })

    return rules
}
