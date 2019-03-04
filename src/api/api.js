import moment from 'moment'
import _ from 'lodash'
import { get, postData, del, put, setBaseUrl } from './crud'
import {
    getProgramStage,
    getProgramRules,
    toTable,
    getRecords,
} from './helpers'

const _personTypeId = 'tOJvIFXsB5V'
const _programStageId = 'UW26ioWbKzv'

const _deoGroup = 'mYdK5QT4ndl'
const _l1ApprovalGroup = 'jVK9RNKNLus'
const _l2ApprovalGroup = 'TFmNnLn06Rd'

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
 * Sets the base URL, username, and user groups.
 * @param {String} url
 */
export async function init(baseUrl) {
    setBaseUrl(baseUrl)

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
            '.json?fields=trackedEntityTypeAttributes[mandatory,trackedEntityAttribute[name,' +
            'id,displayName,valueType,unique,optionSetValue,optionSet[id,options[displayName,code]]]]'
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
export async function getEventCounts(orgUnit, approvalStatuses, userOnly) {
    let counts = {}
    for (const approvalStatus of approvalStatuses) {
        const events = await getRecords(
            orgUnit,
            false,
            approvalStatus,
            userOnly ? _username : false
        )
        counts[approvalStatus] = events.length
    }

    return counts
}

export async function getEventsByStatus(orgUnit, approvalStatus, userOnly) {
    const events = await getRecords(
        orgUnit,
        true,
        approvalStatus,
        userOnly ? _username : false
    )
    return await toTable(events)
}

/**
 * Gets all events within organisation unit and it's descendants.
 * @param {string} orgUnit - Organisation unit to look within.
 * @param {string} userOnly - If true, will only get events created by user (optional).
 * @returns {Object[]} All events.
 */
export async function getEvents(orgUnit, userOnly) {
    const events = await getRecords(
        orgUnit,
        true,
        '',
        userOnly ? _username : false
    )
    return await toTable(events)
}

export async function getRecordForApproval(eventId) {
    let { values, programId, programStageId } = await getEventValues(eventId)
    let programStage = await getProgramStage(
        programStageId,
        values,
        false,
        _isL1User,
        _isL2User
    )
    programStage.programStageSections
        .filter(section => section.name === 'Institute / Hospital Information')
        .forEach(section => (section.hideWithValues = true))

    return {
        programStage: programStage,
        values: values,
        rules: await getProgramRules(programId, programStageId),
    }
}

export async function getProgramStageNew(
    programId,
    programStageId,
    organismCode
) {
    let values = { [_organismsDataElementId]: organismCode }
    values[_organismsDataElementId] = organismCode
    let programStage = await getProgramStage(programStageId, values, true)
    programStage.programStageSections
        .filter(section => section.name === 'Approval')
        .forEach(section => (section.hideWithValues = true))
    return {
        programStage: programStage,
        values: values,
        rules: await getProgramRules(programId, programStageId),
    }
}

/**
 * Gets AMR program stage, values, and organism data element ID.
 * @param {string} eventId - Event ID.
 * @returns {Object} AMR program stage, values, and organism data element ID.
 */
export async function getProgramStageExisting(eventId) {
    let { values, programId, programStageId } = await getEventValues(eventId)
    return {
        programStage: await getProgramStage(programStageId, values, false),
        values: values,
        rules: await getProgramRules(programId, programStageId),
    }
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

export async function addPersonWithEvent(
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityValues
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
        },
        eventValues
    )

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

    return {
        amrId: amrId,
        entityId: (await (await postData(
            'trackedEntityInstances/',
            data
        )).json()).response.importSummaries[0].reference,
    }
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

    // Enrolling if not already enrolled.
    let enrollments = []
    enrollments = (await get(
        'trackedEntityInstances/' +
            entityId +
            '.json?fields=enrollments[program]'
    )).enrollments
    if (!enrollments.find(enrollment => enrollment.program === programId)) {
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
