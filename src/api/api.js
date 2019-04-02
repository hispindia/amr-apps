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

export const _organismsDataElementId = 'SaQe2REkGVw'
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

export async function initMetadata() {
    // Replaces '#{xxx}' with 'this.state.values['id of xxx']'
    const programCondition = c => {
        const original = c
        try {
            const variableDuplicated = c.match(/#\{.*?\}/g)
            let variables = []
            if (!variableDuplicated) return c
            variableDuplicated.forEach(duplicated => {
                if (variables.indexOf(duplicated) === -1)
                    variables.push(duplicated)
            })
            variables.forEach(variable => {
                const name = variable.substring(2, variable.length - 1)
                const id = data.programRuleVariables.find(
                    ruleVariable => ruleVariable.name === name
                ).dataElement.id
                c = c.replace(
                    new RegExp('#{' + name + '}', 'g'),
                    "values['" + id + "']"
                )
            })
        } catch {
            console.warn('Improper condition:', original)
        }
        return c
    }

    // Replaces 'A{xxx}' with 'this.state.values['id of xxx']'
    const entityCondition = c => {
        const variableDuplicated = c.match(/A\{.*?\}/g)
        let variables = []
        if (!variableDuplicated) return c
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
        })

        variables.forEach(variable => {
            const id = attributeIds[variable.substring(2, variable.length - 1)]
            c = c.replace(/A\{.*?\}/g, "values['" + id + "']")
        })

        return c
    }

    let data = await get('metadata.json?' +
        'options=true&programs=true&optionSets=true&optionGroups=true&' +
        'programRuleVariables=true&programRules=true&trackedEntityTypes=true' +
        '&fields=id,name,displayName,code,options,dataElement,program,organisationUnits,' +
        'programStage,programStages[id,displayName,programStageDataElements[' +
        'dataElement[id],compulsory],programStageSections[id,name,' +
        'displayName,renderType,dataElements[id,displayFormName,code,' +
        'valueType,optionSetValue,optionSet]]],programRuleActions[' +
        'programRuleActionType,dataElement,optionGroup,' +
        'trackedEntityAttribute,programStageSection,data],condition,' +
        'trackedEntityTypeAttributes[name,id,displayName,valueType,unique,' +
        'optionSetValue,optionSet]trackedEntityTypeAttributes[mandatory,' +
        'trackedEntityAttribute[name,id,displayName,valueType,unique,' +
        'optionSetValue,optionSet]],priority')

    let options = {}
    data.options.forEach(o => options[o.id] = {
        label: o.displayName,
        value: o.code
    })

    let optionSets = {}
    data.optionSets.forEach(os => optionSets[os.id] =
        os.options.map(o => options[o.id])
    )
    data.optionGroups.forEach(os => optionSets[os.id] =
        os.options.map(o => options[o.id])
    )

    let person = data.trackedEntityTypes.find(type => type.id = _personTypeId)

    person.uniques = {}
    person.values = {}
    let attributeIds = {}
    person.trackedEntityTypeAttributes.forEach(a => {
        if (a.trackedEntityAttribute.unique)
            person.uniques[a.trackedEntityAttribute.id] = true
        person.values[a.trackedEntityAttribute.id] = ''
        a.hide = false
        attributeIds[a.trackedEntityAttribute.name] = a.trackedEntityAttribute.id
    })

    person.rules = []
    data.programRules.filter(r => r.programRuleActions.find(a => a.trackedEntityAttribute))
    .forEach(d => {
        if (!person.rules.find(rule => rule.name === d.name)) {
            d.condition = entityCondition(d.condition)
            person.rules.push(d)
        }
    })

    let programs = data.programs

    let programList = []
    let stageLists = {}
    let programOrganisms = {}
    programs.forEach(p => {
        programList.push({
            value: p.id,
            label: p.name,
        })
        let stages = []
        programOrganisms[p.id] = data.optionGroups.find(og => og.name === p.name).id
        let remove = []
        p.programStages.forEach(ps => {
            stages.push({
                value: ps.id,
                label: ps.displayName,
            })
            ps.programStageSections.forEach(pss => {
                let childSections = []
                ps.programStageSections
                    .filter(childSection =>
                        childSection.name.match(new RegExp('{' + pss.name + '}.*'))
                    )
                    .forEach(childSection => {
                        remove.push(childSection.id)
                        childSection.name = childSection.name.replace(
                            new RegExp('{' + pss.name + '}'),
                            ''
                        )
                        childSections.push(childSection)
                    })
                pss.childSections = childSections
            })
            ps.programStageSections = ps.programStageSections.filter(
                s => !remove.includes(s.id)
            )
            let resultSection = ps.programStageSections.find(s => s.name === 'Result')
            if(resultSection) resultSection.hideWithValues = true
        })
        stageLists[p.id] = stages
    })

    programs.rules = []
    data.programRules.filter(r => r.programRuleActions.find(a => a.dataElement || a.programStageSection))
    .forEach(d => {
        d.condition = programCondition(d.condition)
        programs.rules.push(d)
    })
    programs.rules = programs.rules.sort((a, b) => (a.priority > b.priority) || !a.priority ? 1 : -1)

    let metadata = { optionSets, person, programs, programList, stageLists, programOrganisms }
    console.log(data)
    console.log(metadata)

    return metadata
}

/**
 * Gets the attributes and values of the AMR program.
 * @param {string} entityId - Entity id.
 * @returns {Object} Attributes, values, uniques, districts.
 */''
export async function getEntityAttributes(entityId) {
    const attributes = (await get(
        'trackedEntityTypes/' +
        _personTypeId +
        '.json?fields=trackedEntityTypeAttributes[mandatory,' +
        'trackedEntityAttribute[name,id,displayName,valueType,unique,' +
        'optionSetValue,optionSet[id,options[displayName,code]]]]'
    )).trackedEntityTypeAttributes

    // Contains attribute values.
    let values = entityId ? await getPersonValues(entityId) : {}
    // Contains attributes which are unique.
    let uniques = {}
    // Attribute names as key and id as value.
    let attributeIds = {}

    attributes.forEach(a => {
        if (a.trackedEntityAttribute.unique)
            uniques[a.trackedEntityAttribute.id] = true
        if (!values[a.trackedEntityAttribute.id])
            values[a.trackedEntityAttribute.id] = ''
        if (a.trackedEntityAttribute.optionSetValue) {
            let options = []
            a.trackedEntityAttribute.optionSet.options.forEach(option =>
                options.push({
                    value: option.code,
                    label: option.displayName,
                })
            )
            a.trackedEntityAttribute.optionSet.options = options
        }
        a.hide = false
        attributeIds[a.trackedEntityAttribute.name] =
            a.trackedEntityAttribute.id
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
        'trackedEntityInstances.json?ouMode=ACCESSIBLE&paging=false&' +
        'fields=trackedEntityInstance&trackedEntityType=' +
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
            '.json?ouMode=ALL&fields=attributes[code,displayName,' +
            'valueType,attribute,value]'
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
        'trackedEntityInstances/' + id
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

export async function newRecord( pId, pStage, orgaCode, ou, eId, eValues) {
    let initialValues = { [_organismsDataElementId]: orgaCode, [_amrDataElement]: await generateAmrId(ou) }
    const { entityId, eventId } = eId ?
        await addEvent(initialValues, pId, pStage.id, ou, eId, eValues) :
        await addPersonWithEvent(initialValues, pId, pStage.id, ou, eValues)

    const { programStage, eventValues, status } = await getProgramStageDeo(pStage, initialValues, false, true)

    return { programStage, eventValues, status, eventId, entityId }
}

export async function existingRecord(programs, eventId, isApproval) {
    let { eventValues: initialValues, programId, programStageId, completed, entityId } = await getEventValues(eventId)
    const pStage = programs.find(p => p.id === programId)
        .programStages.find(ps => ps.id = programStageId)
    const { programStage, eventValues, status } = !isApproval ?
        await getProgramStageDeo(pStage, initialValues, completed, false) :
        await getProgramStageApproval(pStage, initialValues, completed, false, _isL1User, _isL2User)
    return { programId, programStage, eventValues, status, eventId, entityId }
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

    return {
        entityId: r.response.importSummaries[0].reference,
        eventId: r.response.importSummaries[0].enrollments.importSummaries[0].events.importSummaries[0].reference
    }
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

    return {
        entityId,
        eventId: r.response.importSummaries[0].reference
    }
}

export async function setEventStatus(eventId, completed, isApproval) {
    let event = await get('events/' + eventId)
    let dateElement = event.dataValues.find(dv => dv.dataElement === _sampleDateElementId)
    if (dateElement) event.eventDate = dateElement.value
    event.status = completed ? 'COMPLETED' : 'ACTIVE'
    if (!isApproval) {
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
