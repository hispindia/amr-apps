import moment from 'moment'
import _ from 'lodash'
import { get, postData, del, put, setBaseUrl } from './crud'
import {
    getProgramStageDeo,
    getProgramStageApproval,
    getEventValues,
    getEntityRules,
    generateAmrId,
} from './helpers'

const _personTypeId = 'tOJvIFXsB5V'

const _deoGroup = 'mYdK5QT4ndl'
const _l1ApprovalGroup = 'jVK9RNKNLus'
const _l2ApprovalGroup = 'TFmNnLn06Rd'

const _organismsDataElementId = 'SaQe2REkGVw'
const _amrDataElement = 'lIkk661BLpG'
const _sampleDateElementId = 'JRUa0qYKQDF'
export const _testResultDataElementId = 'bSgpKbkbVGL'

const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RevisionReason = 'fEnFVvEFKVc'

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

/**
 * Gets user accesses.
 * @returns {Object} User accesses.
 */
export function getUserAccess() {
    return {
        isDeoUser: _isDeoUser,
        isL1User: _isL1User,
        isL2User: _isL2User,
    }
}

/**
 * Sets the base URL, username, and user groups.
 * @param {String} baseUrl - Base URL.
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
        'trackedEntityInstances.json?ouMode=ACCESSIBLE&paging=false&fields=trackedEntityInstance&trackedEntityType=' +
            _personTypeId +
            '&filter=' +
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
 * Adds a new person..
 * @param {Object} values - Values
 * @returns {string} Tracked entity instance ID.
 */
export async function addPerson(values, orgUnit) {
    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: orgUnit,
        attributes: [],
    }
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    return (await (await postData('trackedEntityInstances/', data)).json())
        .response.importSummaries[0].reference
}

/**
 * Updates a person.
 * @param {string} id - Tracked entity instance id.
 * @param {Object} values - Values.
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
 * Gets the program stage for a new event.
 * @param {string} programId
 * @param {string} programStageId
 * @param {string} organismCode
 * @returns {Object} Program stage, values,
 */
export async function getProgramStageNew(
    programId,
    programStageId,
    organismCode,
    orgUnit,
    entityId,
    entityValues
) {
    let initialValues = { [_organismsDataElementId]: organismCode, [_amrDataElement]: await generateAmrId(orgUnit) }
    const eventId = entityId ?
        await addEvent(initialValues, programId, programStageId, orgUnit, entityId, entityValues) :
        await addPersonWithEvent(initialValues, programId, programStageId, orgUnit, entityValues)

    const { programStage, eventValues, rules } = await getProgramStageDeo(programId, programStageId, initialValues)

    return { programStage, eventValues, rules, eventId }
}

/**
 * Gets AMR program stage, values, and organism data element ID.
 * @param {string} eventId - Event ID.
 * @returns {Object} AMR program stage, values, and organism data element ID.
 */
export async function getProgramStageExisting(eventId) {
    let { eventValues: initialValues, programId, programStageId, completed } = await getEventValues(eventId)
    const { programStage, eventValues, rules } = await getProgramStageDeo(programId, programStageId, initialValues)
    return { programStage, eventValues, rules, eventId, completed }
}

export async function getRecordForApproval(eventId) {
    let { eventValues: initialValues, programId, programStageId, completed } = await getEventValues(eventId)
    const { programStage, eventValues, rules } = await getProgramStageApproval(programId, programStageId, initialValues, _isL1User, _isL2User)
    return { programStage, eventValues, rules, eventId, completed }
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
 * Adds values to event.
 * @param {Object} event - Event.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 * @returns {Object} Event.
 */
async function setEventValues(event, values) {
    if (!values[_amrDataElement])
        values[_amrDataElement] = await generateAmrId(event.orgUnit)

    if (!event.dataValues) event.dataValues = []

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

    let event = await setEventValues(
        {
            dataValues: [],
            eventDate: date,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            status: 'ACTIVE'
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

    const r = await postData('trackedEntityInstances/', data)

    return r.response.importSummaries[0].enrollments.importSummaries[0].events.importSummaries[0].reference
}

/**
 * Adds a new event. Enrolls person if not already enrolled.
 * @param {Object[]} eventValues - Values.
 * @param {string} programId - Program ID.
 * @param {string} programStageId - Program stage ID.
 * @param {string} orgUnitId - Organisation unit ID.
 * @param {string} entityId - Tracked entity instance ID.
 * @param {string} entityValues - Entity values.
 */
export async function addEvent(
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityId,
    entityValues
) {
    const date = eventValues[_sampleDateElementId]
        ? eventValues[_sampleDateElementId]
        : moment()

    let event = await setEventValues(
        {
            dataValues: [],
            eventDate: date,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            trackedEntityInstance: entityId,
            status: 'ACTIVE'
        },
        eventValues
    )

    if (entityValues) await updatePerson(entityId, entityValues)

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

    const r = await postData('events', event)


    return r.response.importSummaries[0].reference
}

export async function setEventStatus(eventId, completed, resetApproval) {
    let event = await get('events/' + eventId + '.json')
    let dateElement = event.dataValues.find(dv => dv.dataElement === _sampleDateElementId)
    if (dateElement) event.eventDate = dateElement.value
    event.status = completed ? 'COMPLETED' : 'ACTIVE'
    if (resetApproval) {
        let values = {}
        event.dataValues.forEach(dataValue => (values[dataValue.dataElement] = dataValue.value))
        if (values[_l1ApprovalStatus] === 'Resend') {
            values[_l1ApprovalStatus] = ''
            values[_l1RevisionReason] = ''
        }
        if (values[_l2ApprovalStatus] === 'Resend') {
            values[_l2ApprovalStatus] = ''
            values[_l2RevisionReason] = ''
        }
        event = await setEventValues(event, values)
    }
    await put('events/' + eventId, event)
}

export async function updateEventValue(eventId, dataElementId, value) {
    const updateValue = async (i, v) =>
        await put('events/' + eventId + '/' + dataElementId, { dataValues: [{ dataElement: i, value: v }] })

    await updateValue(dataElementId, value)
    if (dataElementId === _sampleDateElementId)
        await updateValue(_sampleDateElementId, value)
}

/**
 * Deletes event.
 * @param {string} eventId - Event ID.
 */
export async function deleteEvent(eventId) {
    await del('events/' + eventId)
}

export async function getEvents(config, orgUnit, userOnly) {
    if (userOnly)
        return (await get(
            'sqlViews/' +
                config.sqlView +
                '/data.json?paging=false&var=orgunit:' +
                orgUnit +
                (config.param ? '&var=status:' + config.status : '') +
                (userOnly ? '&var=username:' + _username : '')
        )).listGrid.rows
    else
        return (await get(
            'sqlViews/' +
                (_isL2User ? config.sqlView.l2 : config.sqlView.l1) +
                '/data.json?paging=false&var=orgunit:' +
                orgUnit +
                (config.param ? '&var=status:' + config.status : '') +
                (userOnly ? '&var=username:' + _username : '')
        )).listGrid.rows
}

export async function getCounts(items, orgUnit, userOnly) {
    if (userOnly)
        for (let item of items)
            item.count = (await get(
                'sqlViews/' +
                    item.countView +
                    '/data.json?paging=false&var=orgunit:' +
                    orgUnit +
                    (item.param ? '&var=status:' + item.status : '') +
                    (userOnly ? '&var=username:' + _username : '')
            )).listGrid.rows[0][0]
    else
        for (let item of items)
            item.count = (await get(
                'sqlViews/' +
                    (_isL2User ? item.countView.l2 : item.countView.l1) +
                    '/data.json?paging=false&var=orgunit:' +
                    orgUnit +
                    (item.param ? '&var=status:' + item.status : '') +
                    (userOnly ? '&var=username:' + _username : '')
            )).listGrid.rows[0][0]
    return items
}
