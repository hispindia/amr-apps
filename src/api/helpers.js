import { get } from './crud'

const _organismsDataElementId = 'SaQe2REkGVw'

const _amrDataElement = 'lIkk661BLpG'
const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RejectionReason = 'NLmLwjdSHMv'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RejectionReason = 'pz8SoHBO6RL'
const _l2RevisionReason = 'fEnFVvEFKVc'

// This may look a dumb way of doing it, but it is not possible to filter for events
// without any value in a particular dataElement.
export const getRecords = async (orgUnit, username, isL1User, isL2User) => {
    const getValue = (dataValues, id, status) => {
        const dataValue = dataValues.find(
            dataValue => dataValue.dataElement === id
        )
        return dataValue ? dataValue.value === status : false
    }

    let events = (await get(
        'events.json?paging=false&fields=program,storedBy,orgUnit,event,lastUpdated,created,dataValues[dataElement,value]&orgUnit=' +
            orgUnit +
            '&ouMode=DESCENDANTS'
    )).events

    let byStatus = {}

    if (username) {
        events = events.filter(event => event.storedBy === username)
        byStatus.ALL = events
    }

    for (let status of ['Rejected', 'Approved', 'Resend']) {
        byStatus[status] = events.filter(event =>
            username || isL1User
                ? getValue(event.dataValues, _l1ApprovalStatus, status)
                : false || (username || isL2User)
                ? getValue(event.dataValues, _l2ApprovalStatus, status)
                : false
        )
        if (byStatus[status].length > 0)
            events = [events, byStatus[status]].reduce((a, b) =>
                a.filter(c => !b.includes(c))
            )
    }
    byStatus['Validate'] = events

    return byStatus
}

export const getProgramStage = async (
    programStageId,
    values,
    newRecord,
    isL1User,
    isL2User
) => {
    const shouldDisable = element => {
        switch (element.id) {
            case _amrDataElement:
            case _organismsDataElementId:
                return true
            case _l1ApprovalStatus:
            case _l1RejectionReason:
            case _l1RevisionReason:
                return !isL1User || values[_l1ApprovalStatus] === 'Approved' || values[_l1ApprovalStatus] === 'Rejected' || values[_l2ApprovalStatus] === 'Rejected'
            case _l2ApprovalStatus:
            case _l2RejectionReason:
            case _l2RevisionReason:
                return !isL2User || values[_l2ApprovalStatus] === 'Approved' || values[_l2ApprovalStatus] === 'Rejected' || values[_l1ApprovalStatus] === 'Rejected'
            default:
                if (newRecord) return false
                else if (isL1User || isL2User) return true
                else
                    return (
                        values[_l2ApprovalStatus] !== 'Resend' && values[_l2ApprovalStatus] &&
                        values[_l1ApprovalStatus] !== 'Resend' && values[_l1ApprovalStatus]
                    )
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
        'programRules.json?paging=false&fields=condition,programRuleActions[dataElement[id,name],data,programRuleActionType,' +
            'optionGroup[id,options[code,displayName]]&filter=programRuleActions.dataElement:!null&filter=programStage:null&' +
            'order=priority:asc&filter=programRuleActions.programRuleActionType:in:[SHOWOPTIONGROUP,HIDEFIELD,ASSIGN]' +
            '&filter=program.id:eq:' +
            programId
    )).programRules

    // ProgramStage specific dataElement rules.
    let dataElementRulesStage = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[dataElement[id,name],data,programRuleActionType,' +
            'optionGroup[id,options[code,displayName]]&filter=programRuleActions.dataElement:!null&filter=programRuleActions.' +
            'programRuleActionType:in:[SHOWOPTIONGROUP,HIDEFIELD,ASSIGN]&order=priority:asc&&filter=programStage.id:eq:' +
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
