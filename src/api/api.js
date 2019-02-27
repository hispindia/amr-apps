import * as moment from 'moment'
import _ from 'lodash'
import { get, postData, del, put } from './crud'
import { removeTime } from '../helpers/date'

const _l1ApprovalStatus = 'tAyVrNUTVHX'
//const _l1RejectionReason = 'NLmLwjdSHMv'
//const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
//const _l2RejectionReason = 'pz8SoHBO6RL'
//const _l2RevisionReason = 'fEnFVvEFKVc'

//const _amrProgramId = 'dzizG8i1cmP'
const _personTypeId = 'tOJvIFXsB5V'
const _programStageId = 'UW26ioWbKzv'

const _deoGroup = 'mYdK5QT4ndl'
const _l1ApprovalGroup = 'O7EtwlwnAYq'
const _l2ApprovalGroup = 'XigjUyZB8UE'

const _organismsDataElementId = 'SaQe2REkGVw'
const _amrDataElement = 'lIkk661BLpG'
const _sampleDateElementId = 'JRUa0qYKQDF'

let _isDeoUser
let _isL1User
let _isL2User

let _username = ''
let _orgUnitNames = {}

/**
 * Gets organisms data element ID.
 * @returns {string} Organisms data element ID.
 */
export function getOrganismsDataElementId() {
    return _organismsDataElementId
}

export function getUserAccess() {
    return {
        isDeoUser: _isDeoUser,
        isL1User: _isL1User,
        isL2User: _isL2User,
    }
}

/**
 * Sets user access.
 */
export async function initUser() {
    const user = await get(
        'me.json?fields=userGroups,userCredentials[username]'
    )

    _username = user.userCredentials.username

    const userGroups = user.userGroups.map(userGroup => userGroup.id)
    _isDeoUser = userGroups.includes(_deoGroup)
    _isL1User = userGroups.includes(_l1ApprovalGroup)
    _isL2User = userGroups.includes(_l2ApprovalGroup)
}

/**
 * Gets all tracked entity program rules.
 * @param {Object} attributeIds - Object with attribute name as key and id as value.
 * @returns {Object} Tracked entity program rules.
 */
export async function getEntityRules(attributeIds) {
    // Replaces 'A{xxx}' with 'this.state.values['id of xxx']'
    const getCondition = condition => {
        const variableDuplicated = condition.match(/A\{.*?\}/g)
        let variables = []
        if (!variableDuplicated) return condition
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
        })

        variables.forEach(variable => {
            const id = attributeIds[variable.substring(2, variable.length - 1)]
            condition = condition.replace(/A\{.*?\}/g, "values['" + id + "']")
        })

        return condition
    }

    let data = (await get(
        'programRules.json?paging=false&fields=name,programRuleActions[' +
            'programRuleActionType,optionGroup[id,options[code,displayName]],trackedEntityAttribute[name,id]' +
            ',programRule[condition]]&filter=programRuleActions.trackedEntityAttribute:!null' +
            '&filter=programRuleActions.programRuleActionType:in:[SHOWOPTIONGROUP,HIDEFIELD]'
    )).programRules

    let rules = []
    data.forEach(d => {
        if (!rules.find(rule => rule.name === d.name)) {
            d.programRuleActions.forEach(programRuleAction => {
                programRuleAction.programRule.condition = getCondition(
                    programRuleAction.programRule.condition
                )
                if (
                    programRuleAction.programRuleActionType ===
                    'SHOWOPTIONGROUP'
                ) {
                    let options = []

                    programRuleAction.optionGroup.options.forEach(option =>
                        options.push({
                            value: option.code,
                            label: option.displayName,
                        })
                    )
                    programRuleAction.optionGroup.options = options
                }
            })
            rules.push(d)
        }
    })

    return rules
}

/**
 * Gets the attributes and values of the AMR program.
 * @param {string} entityId - Entity id.
 * @returns {Object} Attributes, values, uniques, districts.
 */
export async function getEntityAttributes(entityId) {
    const attributes = (await get(
        'trackedEntityTypes/' +
            _personTypeId +
            `.json?fields=trackedEntityTypeAttributes[mandatory,trackedEntityAttribute[name,
        id,displayName,valueType,unique,optionSetValue,optionSet[id,options[displayName,code]]]]`
    )).trackedEntityTypeAttributes

    // Contains attribute values.
    let values = entityId ? await getPersonValues(entityId) : {}
    // Contains attributes which are unique.
    let uniques = {}
    // Attribute names as key and id as value.
    let attributeIds = {}

    attributes.forEach(attribute => {
        if (attribute.trackedEntityAttribute.unique)
            uniques[attribute.trackedEntityAttribute.id] = true
        if (!values[attribute.trackedEntityAttribute.id])
            values[attribute.trackedEntityAttribute.id] = ''
        if (attribute.trackedEntityAttribute.optionSetValue) {
            let options = []
            attribute.trackedEntityAttribute.optionSet.options.forEach(option =>
                options.push({
                    value: option.code,
                    label: option.displayName,
                })
            )
            attribute.trackedEntityAttribute.optionSet.options = options
        }
        attribute.hide = false
        attributeIds[attribute.trackedEntityAttribute.name] =
            attribute.trackedEntityAttribute.id
    })

    return {
        attributes: attributes,
        values: values,
        uniques: uniques,
        rules: await getEntityRules(attributeIds),
    }
}

/**
 * Checks if any tracked entity instance has property with value.
 * @param {string} property - Property.
 * @param {string} value - Value.
 * @returns {boolean} - False if unique, tracked entity instance ID otherwise.
 */
export async function checkUnique(property, value) {
    const entities = (await get(
        'trackedEntityInstances.json?ouMode=ALL&fields=trackedEntityInstance&filter=' +
            property +
            ':eq:' +
            value
    )).trackedEntityInstances
    return entities.length > 0 ? entities[0].trackedEntityInstance : false
}

/**
 * Gets tracked entity instance values.
 * @param {string} entityId - Tracked entity instance ID.
 * @returns {Object} Values.
 */
export async function getPersonValues(entityId) {
    const data = await get(
        'trackedEntityInstances/' +
            entityId +
            '.json?ouMode=ALL&fields=attributes[code,displayName,valueType,attribute,value]'
    )

    if (!data) return null

    let values = {}
    data.attributes.forEach(
        attribute => (values[attribute.attribute] = attribute.value)
    )

    return values
}

/**
 * Gets all events belonging to the tracked entity instance with the provided patient registration number.
 * @param {string} entityId - Tracked entity ID.
 * @returns {Object} Events in the form of headers and rows.
 */
export async function getPersonsEvents(entityId) {
    const enrollments = (await get(
        'trackedEntityInstances/' +
            entityId +
            `.json?ouMode=ALL&fields=enrollments[events[event,lastUpdated,created,
            orgUnitName,storedBy,dataValues[dataElement,value]]]`
    )).enrollments

    let data = {
        headers: [
            {
                name: 'Amr Id',
                column: 'Amr Id',
            },
            {
                name: 'Organisation unit',
                column: 'Organisation unit',
            },
            {
                name: 'Stored by',
                column: 'Stored by',
            },
            {
                name: 'Created',
                column: 'Created',
            },
            {
                name: 'Updated',
                column: 'Updated',
            },
            {
                name: 'Event',
                column: 'Event',
                options: { display: false },
            },
        ],
        rows: [],
    }

    // Returns the event's AMR Id.
    const getAmrId = event => {
        const dataElement = event.dataValues.find(
            dataValue => dataValue.dataElement === _amrDataElement
        )
        return dataElement ? dataElement.value : ''
    }

    // Adds all events in row form.
    if (enrollments)
        enrollments.forEach(enrollment => {
            enrollment.events.forEach(event => {
                data.rows.push([
                    getAmrId(event),
                    event.orgUnitName,
                    event.storedBy,
                    removeTime(event.created),
                    removeTime(event.lastUpdated),
                    event.event,
                ])
            })
        })

    return data
}

/**
 * Adds a new person tracked entity instance and enrolls to AMR program.
 * @param {Object} values - Values
 * @returns {string} Tracked entity instance ID.
 */
export async function addPerson(values, orgUnit) {
    //const now = moment().format('YYYY-MM-DD')
    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: orgUnit,
        attributes: [],
        /*enrollments: [
            {
                orgUnit: orgUnit,
                program: _amrProgramId,
                enrollmentDate: now,
                incidentDate: now,
            },
        ],*/
    }
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    return (await (await postData('trackedEntityInstances/', data)).json())
        .response.importSummaries[0].reference
}

/**
 * Updates a tracked entity instance.
 * @param {string} id - Tracked entity instance id.
 * @param {*} values - Values.
 */
export async function updatePerson(id, values) {
    let data = await get(
        'trackedEntityInstances/' + id + '.json?ouMode=ALL&fields=*'
    )
    data.attributes = []
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    await put('trackedEntityInstances/' + id, data)
}

/**
 * Deletes a tracked entity instance.
 * @param {string} id - Tracked entity instance.
 */
export async function deletePerson(id) {
    await del('trackedEntityInstances/' + id)
}

/**
 * Gets all person tracked entities belonging to the OU or it's children.
 * @param {string} orgUnit - Organisation unit ID.
 * @returns {Object} Entities in the form of headers and rows.
 */
export async function getPersons(orgUnit) {
    const values = (await get(
        'trackedEntityInstances.json?ou=' +
            orgUnit +
            `&ouMode=DESCENDANTS&order=created:desc&paging=false&
            fields=orgUnit,trackedEntityInstance,created,lastUpdated,
            attributes[displayName,valueType,attribute,value],enrollments[orgUnitName]`
    )).trackedEntityInstances
    const metaData = (await get(
        'trackedEntityTypes/' +
            _personTypeId +
            '.json?fields=trackedEntityTypeAttributes[trackedEntityAttribute[displayName,id]]'
    )).trackedEntityTypeAttributes

    // Created and Updated are not displayed by default.
    let data = {
        headers: [
            {
                name: 'Created',
                options: { display: false },
            },
            {
                name: 'Updated',
                options: { display: false },
            },
            {
                name: 'Organisation unit',
            },
        ],
        rows: [],
        title: 'Persons',
    }

    // Gets the value of the attribute.
    const getAttributeValue = (value, id) => {
        const attribute = value.attributes.find(
            attribute => attribute.attribute === id
        )
        return attribute ? attribute.value : ''
    }

    // Adds the meta data headers.
    metaData.forEach(metaD =>
        data.headers.push({
            name: metaD.trackedEntityAttribute.displayName,
            id: metaD.trackedEntityAttribute.id,
            options: { display: data.headers.length < 7 },
        })
    )

    // OU ID and Entity are not displayed by default.
    data.headers.push(
        {
            name: 'Organisation unit ID',
            options: { display: false },
        },
        {
            name: 'Entity',
            options: { display: false },
        }
    )

    // Adds the data rows.
    values.forEach(value => {
        let entityValues = [
            removeTime(value.created),
            removeTime(value.lastUpdated),
            _orgUnitNames[value.orgUnit],
        ]
        data.headers
            .slice(3, data.headers.length - 2)
            .forEach(header =>
                entityValues.push(getAttributeValue(value, header.id))
            )
        entityValues.push(value.orgUnit, value.trackedEntityInstance)
        data.rows.push(entityValues)
    })

    return data
}

/**
 * Gets all programs and their program stages.
 * @returns {Object} Programs and program stages.
 */
export async function getPrograms() {
    const data = (await get(
        'programs.json?paging=false&fields=id,name,programStages[id,name]'
    )).programs

    let programs = []
    let programStages = {}
    data.forEach(program => {
        programs.push({
            value: program.id,
            label: program.name,
        })
        let stages = []
        program.programStages.forEach(programStage =>
            stages.push({
                value: programStage.id,
                label: programStage.name,
            })
        )
        programStages[program.id] = stages
    })

    return { programs, programStages }
}

/**
 * Gets organisms belonging to an organism group.
 * @param {string} organismGroup - Organism/program name.
 * @returns {Object[]} Organisms.
 */
export async function getOrganisms(organismGroup) {
    const options = (await get(
        'optionGroups.json?paging=false&fields=name,options[code,displayName]&filter=name:eq:' +
            organismGroup
    )).optionGroups[0].options

    let organisms = []
    options.forEach(option => {
        if (!organisms.find(organism => organism.value === option.code))
            organisms.push({
                value: option.code,
                label: option.displayName,
            })
    })

    return organisms
}

/**
 * Gets values for a single event.
 * @param {string} eventId - AMR Id.
 * @returns {Object} Event values.
 */
export async function getEventValues(eventId) {
    const data = await get('events/' + eventId + '.json')
    let values = {}

    data.dataValues.forEach(
        dataValue => (values[dataValue.dataElement] = dataValue.value)
    )

    return {
        programId: data.program,
        programStageId: data.programStage,
        values: values,
    }
}

/**
 * Gets the amount of events by approval status.
 * @param {string} orgUnit - Organisation unit ID.
 * @param {string[]} approvalStatuses - Approval statuses.
 * @returns {Object} Counts of events.
 */
export async function getEventCounts(orgUnit) {
    let counts = {}
    for (const approvalStatus of ['Resend', 'Rejected', 'Validate']) {
        let events = (await get(
            'events.json?paging=false&fields=event&orgUnit=' +
                orgUnit +
                '&ouMode=DESCENDANTS' +
                '&filter=' +
                _l1ApprovalStatus +
                ':eq:' +
                approvalStatus
        )).events
        const events2 = (await get(
            'events.json?paging=false&fields=event&orgUnit=' +
                orgUnit +
                '&ouMode=DESCENDANTS' +
                '&filter=' +
                _l2ApprovalStatus +
                ':eq:' +
                approvalStatus
        )).events
        // In order to avoid duplicates.
        events2.forEach(event2 => {
            if (!events.find(event => event.event === event2.event))
                events.push(event2)
        })
        counts[approvalStatus] = events.length
    }

    // Only looking for events where approved at both levels.
    counts['Approved'] = (await get(
        'events.json?paging=false&fields=event&orgUnit=' +
            orgUnit +
            '&ouMode=DESCENDANTS' +
            '&filter=' +
            _l1ApprovalStatus +
            ':eq:Approved,' +
            _l2ApprovalStatus +
            ':eq:Approved'
    )).events.length

    return counts
}

/**
 * Gets all events created by the user.
 * @param {string} orgUnit - Organisation unit to look within.
 * @returns {Object[]} All events.
 */
export async function getEvents(orgUnit) {
    const allEvents = (await get(
        'events.json?paging=false&fields=storedBy,orgUnit,trackedEntityInstance,event,' +
            'lastUpdated,created,dataValues[dataElement,value]&orgUnit=' +
            orgUnit +
            '&ouMode=DESCENDANTS'
    )).events

    // Does not seem to be possible to filter by storedBy with the API.
    const events = allEvents.filter(event => event.storedBy === _username)

    let data = {
        headers: [
            {
                name: 'Amr Id',
                column: 'Amr Id',
            },
            {
                name: 'Approval level 1',
                column: 'Approval level 1',
            },
            {
                name: 'Approval level 2',
                column: 'Approval level 2',
            },
            {
                name: 'Created',
                column: 'Created',
            },
            {
                name: 'Updated',
                column: 'Updated',
            },
            {
                name: 'Organisation unit ID',
                column: 'Organisation unit ID',
                options: { display: false },
            },
            {
                name: 'Entity',
                column: 'Entity',
                options: { display: false },
            },
            {
                name: 'Event',
                column: 'Event',
                options: { display: false },
            },
        ],
        rows: [],
    }

    const getValues = event => {
        const getValue = dataElement =>
            event.dataValues.find(
                dataValue => dataValue.dataElement === dataElement
            )
        const amrDataElement = getValue(_amrDataElement)
        const l1DataElement = getValue(_l1ApprovalStatus)
        const l2DataElement = getValue(_l2ApprovalStatus)
        return {
            amrValue: amrDataElement ? amrDataElement.value : '',
            l1Value: l1DataElement ? l1DataElement.value : '',
            l2Value: l2DataElement ? l2DataElement.value : '',
        }
    }

    events.forEach(event => {
        const { amrValue, l1Value, l2Value } = getValues(event)
        data.rows.push([
            amrValue,
            l1Value,
            l2Value,
            removeTime(event.created),
            removeTime(event.lastUpdated),
            event.orgUnit,
            event.trackedEntityInstance,
            event.event,
        ])
    })

    return data
}

/**
 * Gets AMR program stage, values, and organism data element ID.
 * @param {string} eventId - Event ID.
 * @returns {Object} AMR program stage, values, and organism data element ID.
 */
export async function getProgramStage(
    programId,
    programStageId,
    organismCode,
    eventId
) {
    const isDisabled = element => {
        switch (element.id) {
            /*case _l1ApprovalStatus:
            case _l1RejectionReason:
            case _l1RevisionReason:
                if (!_isL1User || values[_l1ApprovalStatus] === 'Approved')
                    element.disabled = true
                return
            case _l2ApprovalStatus:
            case _l2RejectionReason:
            case _l2RevisionReason:
                if (!_isL2User || values[_l2ApprovalStatus] === 'Approved')
                    element.disabled = true
                return*/
            case _amrDataElement:
                element.disabled = true
                return
            default:
                element.disabled = false
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
                return
        }
    }

    let values = {}
    if (eventId) {
        let eventData = await getEventValues(eventId)
        programId = eventData.programId
        programStageId = eventData.programStageId
        values = eventData.values
    }

    let programStage = await get(
        'programStages/' +
            programStageId +
            `.json?fields=displayName,programStageDataElements[dataElement[id,formName],compulsory],
            programStageSections[id,name,displayName,dataElements[id,displayFormName,code,valueType,optionSetValue,
                optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]`
    )

    values[_organismsDataElementId] = organismCode

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
            isDisabled(dataElement)
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

    return {
        programStage: programStage,
        values: values,
        rules: await getProgramRules(programId, programStageId),
        isResend: [
            values[_l1ApprovalStatus],
            values[_l2ApprovalStatus],
        ].includes('Resend'),
    }
}

/**
 * Gets AMR program rules.
 * @returns {Object} Object with data element and section rules.
 */
export async function getProgramRules(programId, programStageId) {
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
                const id = programRuleVariables.find(ruleVariable => ruleVariable.name === name).dataElement.id
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

/**
 * Gets the user's organisation units along with their descendants.
 * @returns {Object[]} Organisation units.
 */
export async function getOrgUnits() {
    // Getting the max OU level.
    const maxLevel = (await get(
        'organisationUnits.json?fields=level&pageSize=1&order=level:desc'
    )).organisationUnits[0].level

    // Creating string which will be used in query.
    let childrenString = ''
    _.times(maxLevel, () => (childrenString += ',children[id,displayName'))
    _.times(maxLevel, () => (childrenString += ']'))

    // Getting the user's OU's.
    const userOrgUnits = (await get('me.json?fields=organisationUnits'))
        .organisationUnits

    // Creating string which will be used in query.
    let orgUnitsString = '[' + userOrgUnits[0].id
    _.times(
        userOrgUnits.length - 1,
        index => (orgUnitsString += ',' + userOrgUnits[index + 1].id)
    )
    orgUnitsString += ']'

    // Getting the OU's with descendants.
    let data = (await get(
        'organisationUnits.json?filter=id:in:' +
            orgUnitsString +
            '&paging=false&order=level:asc&fields=id,displayName' +
            childrenString
    )).organisationUnits

    // Sorts the children of the OU by display name.
    const sortChildren = orgUnit => {
        _orgUnitNames[orgUnit.id] = orgUnit.displayName
        if (orgUnit.children)
            if (orgUnit.children.length) {
                orgUnit.children.forEach(child => sortChildren(child))
                orgUnit.children.sort((a, b) =>
                    a.displayName > b.displayName
                        ? 1
                        : b.displayName > a.displayName
                        ? -1
                        : 0
                )
            }
    }

    // Sorting descendants of each of the user's OU's.
    data.forEach(d => sortChildren(d))

    return data
}

/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitId - Organisation unit ID.
 * @returns {string} AMR Id.
 */
export async function generateAmrId(orgUnitId) {
    const orgUnitCode = (await get(
        'organisationUnits/' + orgUnitId + '.json?fields=code'
    )).code

    const newCode = () =>
        orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)

    let amrId = newCode()
    while (
        (await get(
            'events/query.json?programStage=' +
                _programStageId +
                '&filter=' +
                _amrDataElement +
                ':eq:' +
                amrId
        )).height !== 0
    )
        amrId = newCode()

    return amrId
}

/**
 * Adds values to event.
 * @param {Object} event - Event.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 * @returns {Object} Event.
 */
async function setEventValues(event, values) {
    // Setting result values.
    /*Object.keys(testFields)
        .filter(testFieldId => testFields[testFieldId].name.endsWith('_Result'))
        .forEach(testResultFieldId => {
            const testValueFieldIds = Object.keys(testFields).filter(
                testValueFieldId =>
                    values[testValueFieldId] !== '' &&
                    testFields[testValueFieldId].Resistant &&
                    testFields[testValueFieldId].Intermediate_Low &&
                    testFields[testValueFieldId].Susceptible &&
                    (testFields[testResultFieldId].name ===
                        testFields[testValueFieldId].name + '_Result' ||
                        testFields[testResultFieldId].name.replace(
                            '_Result',
                            ''
                        ) ===
                            testFields[testValueFieldId].name.replace(
                                /_(.*)/,
                                ''
                            ))
            )
            if (testValueFieldIds.length > 0) {
                // Prioritising MIC over DD.
                const testValueFieldId =
                    testValueFieldIds.length > 1
                        ? testValueFieldIds.find(id =>
                              testFields[id].name.includes('MIC')
                          )
                        : testValueFieldIds[0]
                const testValueField = testFields[testValueFieldId]
                const intValue = parseInt(values[testValueFieldId])
                values[testResultFieldId] =
                    intValue >= testValueField.Resistant
                        ? 'Resistant'
                        : intValue >= testValueField.Intermediate_Low
                        ? 'Intermediate'
                        : intValue <= testValueField.Susceptible
                        ? 'Susceptible'
                        : ''
            }
        })*/

    if (!values[_amrDataElement])
        values[_amrDataElement] = await generateAmrId(event.orgUnit)

    for (let dataElement in values) {
        const dataE = event.dataValues.find(
            dataValue => dataValue.dataElement === dataElement
        )
        !dataE
            ? event.dataValues.push({
                  dataElement: dataElement,
                  value: values[dataElement],
              })
            : (dataE.value = values[dataElement])
    }

    return {
        event: event,
        amrId: values[_amrDataElement],
    }
}

async function addPersonWithEvent(entityValues, event) {
    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: event.orgUnit,
        attributes: Object.keys(entityValues).map(key => {
            return { attribute: key, value: entityValues[key] }
        }),
        enrollments: [
            {
                orgUnit: event.orgUnit,
                program: event.program,
                enrollmentDate: event.eventDate,
                incidentDate: event.eventDate,
                events: [event],
            },
        ],
    }

    console.log(data)

    await postData('trackedEntityInstances/', data)
}

/**
 * Adds a new event. Enrolls person if not already enrolled.
 * @param {Object[]} eventValues - Values.
 * @param {string} programId - Program ID.
 * @param {string} programStageId - Program stage ID.
 * @param {string} orgUnitId - Organisation unit ID.
 * @param {string} entityId - Tracked entity instance ID.
 */
export async function addEvent(
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityValues,
    entityId
) {
    const date = eventValues[_sampleDateElementId]
        ? eventValues[_sampleDateElementId]
        : moment()

    let { event, amrId } = await setEventValues(
        {
            dataValues: [],
            eventDate: date,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            trackedEntityInstance: entityId,
        },
        eventValues
    )

    // If adding event and to new person.
    if (!entityId) {
        await addPersonWithEvent(entityValues, event)
        return amrId
    }

    // Enrolling if not already enrolled.
    let enrollments = []
    enrollments = (await get(
        'trackedEntityInstances/' +
            entityId +
            '.json?fields=enrollments[program]'
    )).enrollments
    const isEnrolled = enrollments.find(
        enrollment => enrollment.program === programId
    )
    if (!isEnrolled) {
        await postData('enrollments', {
            trackedEntityInstance: entityId,
            orgUnit: orgUnitId,
            program: programId,
            enrollmentDate: date,
            incidentDate: date,
        })
    }

    await postData('events', event)
    return amrId
}

/**
 * Updates event with new values.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 */
export async function updateEvent(values, eventId) {
    let event = await get('events/' + eventId + '.json')

    /*if (isResend)
        values[_l1ApprovalStatus] === 'Resend'
            ? (values[_l1ApprovalStatus] = values[_l1RevisionReason] = '')
            : (values[_l2ApprovalStatus] = values[_l2RevisionReason] = '')*/

    event = await setEventValues(event, values)
    await put('events/' + eventId, event)
}
