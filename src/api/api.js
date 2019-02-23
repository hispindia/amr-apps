import * as moment from 'moment'
import _ from 'lodash'
import { get, postData, del, put } from './crud'
import { removeTime } from '../helpers/date'

const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RejectionReason = 'NLmLwjdSHMv'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RejectionReason = 'pz8SoHBO6RL'
const _l2RevisionReason = 'fEnFVvEFKVc'

const _amrProgramId = 'dzizG8i1cmP'
const _personTypeId = 'tOJvIFXsB5V'
const _programStageId = 'UW26ioWbKzv'
const _amrDataElement = 'lIkk661BLpG'

const _deoGroup = 'mYdK5QT4ndl'
const _l1ApprovalGroup = 'O7EtwlwnAYq'
const _l2ApprovalGroup = 'XigjUyZB8UE'

const _organismDataElementId = 'SaQe2REkGVw'

//const _stateAttributeId = 'ZgUp0jFVxdY'
//const _districtAttributeId = 'SOVNMvY8TOf'
const _sampleDateElementId = 'TajY6FbPSRs'

let _isDeoUser
let _isL1User
let _isL2User

let _orgUnitNames = {}

/**
 * Gets state attribute ID.
 * @returns {string} State attribute ID.
 */
/*export function getStateAttributeId() {
    return _stateAttributeId
}*/

/**
 * Gets district attribute ID.
 * @returns {string} district attribute ID.
 */
/*export function getDistrictAttributeId() {
    return _districtAttributeId
}*/

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
export async function initUserAccess() {
    const userGroups = (await get('me.json?fields=userGroups')).userGroups.map(
        userGroup => userGroup.id
    )
    _isDeoUser = userGroups.includes(_deoGroup)
    _isL1User = userGroups.includes(_l1ApprovalGroup)
    _isL2User = userGroups.includes(_l2ApprovalGroup)
}

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

    let values = entityId ? await getPersonValues(entityId) : {}
    let uniques = {}
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
 * Gets the attributes and values of the AMR program.
 * @returns {Object} Program attributes, values, uniques, districts.
 */
/*export async function getProgramAttributes2(entityId) {
    const programAttributes = (await get(
        'programs/' +
            _amrProgramId +
            `/programTrackedEntityAttributes.json?fields=mandatory,sortOrder,
            trackedEntityAttribute[code,displayName,valueType,id,unique,name,optionSetValue,
                optionSet[options[code,name,id,displayName]]]`
    )).programTrackedEntityAttributes

    let values = entityId ? await getPersonValues(entityId) : {}
    let uniques = {}

    programAttributes.forEach(programAttribute => {
        if (programAttribute.trackedEntityAttribute.unique)
            uniques[programAttribute.trackedEntityAttribute.id] = true
        if (!values[programAttribute.trackedEntityAttribute.id])
            values[programAttribute.trackedEntityAttribute.id] = ''
        if (programAttribute.trackedEntityAttribute.optionSetValue) {
            let options = []
            programAttribute.trackedEntityAttribute.optionSet.options.forEach(
                option =>
                    options.push({
                        value: option.code,
                        label: option.displayName,
                    })
            )
            programAttribute.trackedEntityAttribute.optionSet.options = options
        }
    })

    let districts = []
    if (values[_stateAttributeId])
        districts = await getDistricts(values[_stateAttributeId])

    return {
        programAttributes: programAttributes,
        values: values,
        uniques: uniques,
        districts: districts,
    }
}*/

/**
 * Checks if any tracked entity instance has property with value.
 * @param {string} property - Property.
 * @param {string} value - Value.
 * @returns {boolean} - True if unique.
 */
export async function isUnique(property, value) {
    return (
        (await get(
            `trackedEntityInstances.json?ouMode=ALL&fields=
            attributes[code,displayName,valueType,attribute,value]&filter=` +
                property +
                ':eq:' +
                value
        )).trackedEntityInstances.length === 0
    )
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
 * @param {string} entityId - Patient registration number.
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

    // Returns the events AMR Id.
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
        'programs/' +
            _amrProgramId +
            '.json?fields=programTrackedEntityAttributes[trackedEntityAttribute[displayName,valueType,id]]'
    )).programTrackedEntityAttributes

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
 * Gets all organisms.
 * @returns {Object[]} Organisms with ID and organisms name.
 */
/*export async function getOrganisms() {
    const data = (await get(
        `trackedEntityInstances.json?ouMode=ALL&order=created:desc&paging=false&
        fields=trackedEntityInstance,attributes[displayName,attribute,value]&program=`
        + _organismProgramId
    )).trackedEntityInstances

    const getValue = data => {
        const attribute = data.attributes.find(
            attribute => attribute.attribute === _organismElementId
        )
        return attribute ? attribute.value : ''
    }

    let organisms = []
    data.forEach(d =>
        organisms.push({
            value: d.trackedEntityInstance,
            label: getValue(d),
        })
    )

    organisms.sort((a, b) =>
        a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    )

    return organisms
}*/

/**
 * Gets values for a single event.
 * @param {string} eventId - AMR Id.
 * @returns {Object} Event values.
 */
export async function getEventValues(eventId) {
    const dataValues = (await get('events/' + eventId + '.json')).dataValues
    let values = {}

    dataValues.forEach(
        dataValue => (values[dataValue.dataElement] = dataValue.value)
    )

    return values
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
 * Gets all events from the AMR program with the provided approval status.
 * @param {string} approvalStatus - Approval status.
 * @returns {Object[]} All AMR events.
 */
export async function getEvents(orgUnit, approvalStatus) {
    // If looking for approved events, both levels needs to be approved.
    // Otherwise, just one of the levels needs to be approved.
    let events = []
    switch (approvalStatus) {
        case 'Approved':
            events = (await get(
                `events.json?paging=false&fields=orgUnit,trackedEntityInstance,event,orgUnitName,
                lastUpdated,created,storedBy,dataValues[dataElement,value]&program=` +
                    _amrProgramId +
                    '&orgUnit=' +
                    orgUnit +
                    '&ouMode=DESCENDANTS' +
                    '&filter=' +
                    _l1ApprovalStatus +
                    ':eq:Approved,' +
                    _l2ApprovalStatus +
                    ':eq:Approved'
            )).events
            break
        default:
            events = (await get(
                `events.json?paging=false&fields=orgUnit,trackedEntityInstance,event,orgUnitName,
                lastUpdated,created,storedBy,dataValues[dataElement,value]&program=` +
                    _amrProgramId +
                    '&orgUnit=' +
                    orgUnit +
                    '&ouMode=DESCENDANTS' +
                    '&filter=' +
                    _l1ApprovalStatus +
                    ':eq:' +
                    approvalStatus
            )).events
            const events2 = (await get(
                `events.json?paging=false&fields=orgUnit,trackedEntityInstance,event,orgUnitName,
                lastUpdated,created,storedBy,dataValues[dataElement,value]&program=` +
                    _amrProgramId +
                    '&orgUnit=' +
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
    }

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

    const getAmrId = event => {
        const dataElement = event.dataValues.find(
            dataValue => dataValue.dataElement === _amrDataElement
        )
        return dataElement ? dataElement.value : ''
    }

    events.forEach(event =>
        data.rows.push([
            getAmrId(event),
            event.orgUnitName,
            event.storedBy,
            removeTime(event.created),
            removeTime(event.lastUpdated),
            event.orgUnit,
            event.trackedEntityInstance,
            event.event,
        ])
    )

    return data
}

/**
 * Gets option set by code.
 * @param {string} state - Option set code.
 * @returns {Object[]} Option sets.
 */
/*export async function getDistricts(state) {
    const data = await get(
        'optionGroups.json?paging=false&fields=options[name,displayName,id,code]&filter=name:eq:' +
            state
    )

    let districts = []
    data.optionGroups[0].options.forEach(option =>
        districts.push({
            value: option.code,
            label: option.displayName,
        })
    )

    return districts
}*/

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
    let programStage = await get(
        'programStages/' +
            programStageId +
            `.json?fields=displayName,programStageDataElements[dataElement[id,formName],compulsory],
            programStageSections[id,name,displayName,dataElements[id,displayFormName,code,valueType,optionSetValue,
                optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]`
    )

    const isDisabled = element => {
        switch (element.id) {
            case _l1ApprovalStatus:
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
                return
            case _amrDataElement:
                element.disabled = true
                return
            default:
                element.disabled =
                    typeof eventId === 'undefined'
                        ? false
                        : _isL2User && values[_l2ApprovalStatus] !== 'Approved'
                        ? false
                        : _isL1User && values[_l1ApprovalStatus] !== 'Approved'
                        ? false
                        : values[_l2ApprovalStatus] === 'Resend' ||
                          values[_l1ApprovalStatus] === 'Resend'
                        ? false
                        : true
                return
        }
    }

    let values =
        typeof eventId === 'undefined' ? {} : await getEventValues(eventId)

    values[_organismDataElementId] = organismCode

    //let dataElementIds = {}
    //programStage.programStageDataElements.forEach(dataElement => dataElementIds[dataElement.dataElement.formName] = dataElement.dataElement.id)

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
                programStage.programStageSections.splice(
                    programStage.programStageSections.indexOf(
                        programStage.programStageSections.find(
                            section => section.name === childSection.name
                        )
                    ),
                    1
                )
                childSection.name = childSection.name.replace(
                    new RegExp('{' + programStageSection.name + '}'),
                    ''
                )
                childSections.push(childSection)
            })
        programStageSection.childSections = childSections
    })

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
        const variableDuplicated = condition.match(/#\{.*?\}/g)
        let variables = []
        if (!variableDuplicated) return condition
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
        })

        variables.forEach(variable => {
            const id = programRuleVariables.find(
                ruleVariable =>
                    ruleVariable.name ===
                    variable.substring(2, variable.length - 1)
            ).dataElement.id
            condition = condition.replace(/#\{.*?\}/g, "values['" + id + "']")
        })

        return condition
    }

    let dataElementRules = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[dataElement[id,name],programRuleActionType,optionGroup[id,options[' +
            'code,displayName]]&filter=programRuleActions.dataElement:!null&filter=programStage:null&' +
            'filter=programRuleActions.programRuleActionType:in:[SHOWOPTIONGROUP,HIDEFIELD]&filter=program.id:eq:' +
            programId
    )).programRules

    let sectionRules = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[programStageSection[name,id],programRuleActionType]' +
            '&filter=programRuleActions.programStageSection:!null&filter=programStage:null&filter=' +
            'programRuleActions.programRuleActionType:eq:HIDESECTION&filter=program.id:eq:' +
            programId
    )).programRules

    const programRuleVariables = (await get(
        'programRuleVariables.json?paging=false&fields=name,dataElement&filter=program.id:eq:' +
            programId
    )).programRuleVariables

    let rules = dataElementRules.concat(sectionRules)
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
 * Adds a new record (event).
 * @param {Object} values - Values
 * @param {string} orgUnitId - Organisation unit ID.
 * @param {string} date - Event date.
 */
export async function addRecord(values, orgUnitId, date) {
    let dataValues = []
    for (let key in values) {
        if (key === _amrDataElement)
            dataValues.push({
                dataElement: key,
                value: await generateAmrId(orgUnitId),
            })
        else
            dataValues.push({
                dataElement: key,
                value: values[key],
            })
    }
    const data = {
        program: _amrProgramId,
        orgUnit: orgUnitId,
        eventDate: date ? date : moment().format('YYYY-MM-DD'),
        dataValues: dataValues,
    }
    await postData('events/', data)
    // TODO:
    // Return AMR ID
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
async function setEventValues(event, values, testFields) {
    // Setting result values.
    Object.keys(testFields)
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
        })

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

    return event
}

export async function addEvent(values, testFields, entityId) {
    const { orgUnit, enrollment } = (await get(
        'trackedEntityInstances/' +
            entityId +
            '.json?fields=enrollments[orgUnit,enrollment]'
    )).enrollments[0]

    values[_l1ApprovalStatus] =
        values[_l1ApprovalStatus] === ''
            ? 'Validate'
            : values[_l1ApprovalStatus]
    values[_l2ApprovalStatus] =
        values[_l2ApprovalStatus] === ''
            ? 'Validate'
            : values[_l2ApprovalStatus]

    let event = await setEventValues(
        {
            dataValues: [],
            enrollment: enrollment,
            eventDate: values[_sampleDateElementId],
            orgUnit: orgUnit,
            program: _amrProgramId,
            programStage: _programStageId,
            trackedEntityInstance: entityId,
        },
        values,
        testFields
    )

    await postData('events', event)
}

/**
 * Updates event with new values.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 */
export async function updateEvent(values, testFields, eventId, isResend) {
    let event = await get('events/' + eventId + '.json')

    if (isResend)
        values[_l1ApprovalStatus] === 'Resend'
            ? (values[_l1ApprovalStatus] = values[_l1RevisionReason] = '')
            : (values[_l2ApprovalStatus] = values[_l2RevisionReason] = '')

    event = await setEventValues(event, values, testFields)
    await put('events/' + eventId, event)
}

export async function getTestFields(organismId) {
    const data = await get('dataStore/id/' + organismId + '.json')

    let fields = {}

    if (!data['Panel1']) return fields

    data['Panel1'].Disk_Diffusion.filter(field => field.display).forEach(
        field => (fields[field.id] = field)
    )
    data['Panel1'].MIC.filter(field => field.display).forEach(
        field => (fields[field.id] = field)
    )
    data['Panel1'].Results.filter(field => field.display).forEach(
        field => (fields[field.id] = field)
    )

    return fields
}
