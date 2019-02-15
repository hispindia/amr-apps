import * as moment from 'moment'
import _ from 'lodash'
import { get, postData, del, put } from './crud'
import { removeTime } from '../helpers/date'

const config = require('../config/config.json')

const l1ApprovalStatus = 'tAyVrNUTVHX'
const l1RejectionReason = 'NLmLwjdSHMv'
const l1RevisionReason = 'wCNQtIHJRON'
const l2ApprovalStatus = 'sXDQT6Yaf77'
const l2RejectionReason = 'pz8SoHBO6RL'
const l2RevisionReason = 'fEnFVvEFKVc'

const amrProgramId = 'ecIoUziI2Gb'
const personId = 'G5cty8Gzan7'
const entityLabel = 'Person'
const programStageId = 'dDxm1Z4oOUO'
const organismProgramId = 'GjFZmYa8pOD'
const organismElementId = 'iBc2wcKg2Ba'
const amrDataElement = 'lIkk661BLpG'

//const dataEntryGroup = 'mYdK5QT4ndl'
const l1ApprovalGroup = 'O7EtwlwnAYq'
const l2ApprovalGroup = 'XigjUyZB8UE'

//const dataEntryUserGroup = 'mYdK5QT4ndl'
//const l1UserGroup = 'O7EtwlwnAYq'
//const l2UserGroup = 'XigjUyZB8UE'

const organismDataElementId = 'SaQe2REkGVw'

const stateAttributeId = 'jfydZttH7ls'
const districtAttributeId = 'OkKucSXfbQ2'

/**
 * Gets entity label.
 * @returns {string} Entity Label.
 */
export function getEntityLabel() {
    return entityLabel
}

/**
 * Gets state attribute ID.
 * @returns {string} State attribute ID.
 */
export function getStateAttributeId() {
    return stateAttributeId
}

/**
 * Gets district attribute ID.
 * @returns {string} district attribute ID.
 */
export function getDistrictAttributeId() {
    return districtAttributeId
}

/**
 * Gets the attributes of the AMR program.
 * @returns {Object[]} Attributes
 */
export async function getProgramAttributes() {
    return (await get(
        'programs/' +
            amrProgramId +
            '/programTrackedEntityAttributes.json?fields=mandatory,sortOrder,trackedEntityAttribute[code,displayName,valueType,id,unique,name,optionSetValue,optionSet[options[code,name,id,displayName]]]'
    )).programTrackedEntityAttributes
}

/**
 * Checks if any tracked entity instance has property with value.
 * @param {string} property - Property.
 * @param {string} value - Value.
 * @returns {boolean} - True if unique.
 */
export async function isUnique(property, value) {
    return (
        (await get(
            'trackedEntityInstances.json?ouMode=ALL&fields=attributes[code,displayName,valueType,attribute,value]&filter=' +
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
            '.json?ouMode=ALL&fields=enrollments[events[event,lastUpdated,created,orgUnitName,storedBy,dataValues[dataElement,value]]]'
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
            dataValue => dataValue.dataElement === amrDataElement
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
 */
export async function addPerson(values, orgUnit) {
    const now = moment().format('YYYY-MM-DD')
    let data = {
        trackedEntityType: personId,
        orgUnit: orgUnit,
        attributes: [],
        enrollments: [
            {
                orgUnit: orgUnit,
                program: amrProgramId,
                enrollmentDate: now,
                incidentDate: now,
            },
        ],
    }
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })
    await postData('trackedEntityInstances/', data)
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
    console.log(await put('trackedEntityInstances/' + id, data))
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
export async function getEntities(orgUnit) {
    const values = (await get(
        'trackedEntityInstances.json?ou=' +
            orgUnit +
            '&ouMode=DESCENDANTS&order=created:desc&paging=false&fields=orgUnit,trackedEntityInstance,created,lastUpdated,attributes[displayName,valueType,attribute,value],enrollments[orgUnitName]&program=' +
            amrProgramId
    )).trackedEntityInstances
    const metaData = (await get(
        'programs/' +
            amrProgramId +
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
        title: entityLabel + 's',
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
            value.enrollments[0].orgUnitName,
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
 * Gets all organisms.
 * @returns {Object[]} Organisms with ID and organisms name.
 */
export async function getOrganisms() {
    const data = (await get(
        'trackedEntityInstances.json?ouMode=ALL&order=created:desc&paging=false&fields=trackedEntityInstance,attributes[displayName,attribute,value]&program=' +
            organismProgramId
    )).trackedEntityInstances

    const getValue = data => {
        const attribute = data.attributes.find(
            attribute => attribute.attribute === organismElementId
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
}

/**
 * Gets values for a single event.
 * @param {string} amrId - AMR Id.
 * @returns {Object} Event values.
 */
export async function getEventValues2(amrId) {
    const data = await get(
        'events/query.json?includeAllDataElements=true&programStage=' +
            programStageId +
            '&filter=' +
            amrDataElement +
            ':eq:' +
            amrId
    )

    let values = {}
    data.headers.forEach(
        (header, index) => (values[header.name] = data.rows[0][index])
    )

    return values
}

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
 * Gets all events from the AMR program with the provided approval status.
 * @param {string} approvalStatus - Approval status.
 * @returns {Object[]} All AMR events.
 */
export async function getEvents(orgUnit, approvalStatus) {
    const events = (await get(
        'events.json?paging=false&fields=orgUnit,trackedEntityInstance,event,orgUnitName,lastUpdated,created,storedBy,dataValues[dataElement,value]&program=' +
            amrProgramId +
            '&orgUnit=' +
            orgUnit +
            '&ouMode=DESCENDANTS' +
            '&filter=tAyVrNUTVHX:eq:' +
            approvalStatus
    )).events

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
            dataValue => dataValue.dataElement === amrDataElement
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
export async function getDistricts(state) {
    const data = await get(
        'optionSets.json?paging=false&fields=options[name,displayName,id,code]&filter=code:eq:' +
            state
    )

    if (!data) return []

    let districts = []
    data.optionSets[0].options.forEach(option =>
        districts.push({
            value: option.code,
            label: option.displayName,
        })
    )

    return districts
}

/**
 * Gets AMR program stage, values, and organism data element ID.
 * @returns {Object} AMR program stage, values, and organism data element ID.
 */
export async function getProgramStage(orgUnit, amrId) {
    let programStage = await get(
        'programStages/' +
            programStageId +
            '.json?fields=displayName,programStageDataElements[dataElement[id],compulsory,sortOrder],programStageSections[id,name,displayName,dataElements[id,displayFormName,code,valueType,optionSetValue,optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]'
    )

    const userGroups = (await get('me.json?fields=userGroups')).userGroups.map(
        userGroup => userGroup.id
    )

    let isDisabled = element => {
        switch (element.id) {
            case l1ApprovalStatus:
            case l1RejectionReason:
            case l1RevisionReason:
                if (!userGroups.includes(l1ApprovalGroup))
                    element.disabled = true
                return
            case l2ApprovalStatus:
            case l2RejectionReason:
            case l2RevisionReason:
                if (
                    !userGroups.includes(l2ApprovalGroup) ||
                    l1ApprovalStatus === ''
                )
                    element.disabled = true
                return
            default:
                return
        }
    }

    let values = typeof amrId === 'undefined' ? {} : await getEventValues(amrId)
    const { dataElementRules, sectionRules } = await getProgramRules()

    programStage.programStageSections.forEach(section => {
        // Adding section hide rules.
        if (sectionRules[section.id])
            section.hideCondition = sectionRules[section.id]
        section.dataElements.forEach(dataElement => {
            // Adding required and sort order properties.
            const element = programStage.programStageDataElements.find(
                programStageDataElement =>
                    programStageDataElement.dataElement.id === dataElement.id
            )
            dataElement.required = element.compulsory
            dataElement.sortOrder = element.sortOrder
            // Adding data element hide rules.
            if (dataElementRules[dataElement.id])
                dataElement.hideCondition = dataElementRules[dataElement.id]
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
    programStage.programStageSections
        .filter(
            programStageSection =>
                config.eventForm.specialSections[programStageSection.name]
        )
        .forEach(programStageSection => {
            let childSections = []
            config.eventForm.specialSections[programStageSection.name].forEach(
                sectionName => {
                    let index = programStage.programStageSections
                        .map(section => section.name)
                        .indexOf(sectionName)
                    if (index !== -1) {
                        childSections.push(
                            programStage.programStageSections[index]
                        )
                        programStage.programStageSections.splice(index, 1)
                    }
                }
            )
            programStageSection.childSections = childSections
        })

    return {
        programStage: programStage,
        values: values,
        organismDataElementId: organismDataElementId,
    }
}

/**
 * Gets AMR program rules.
 * @returns {Object} Object with data element and section rules.
 */
export async function getProgramRules() {
    // Replaces '#{xxx}' with 'this.state.values['id of xxx']'
    const getVar = string => {
        try {
            const varName = string.match('#{(.*)}')[1]
            const matchedVar = programVariables.find(
                programVariable => programVariable.name === varName
            )
            return matchedVar
                ? string.replace(
                      /#{(.*)}/,
                      "this.state.values['" + matchedVar.dataElement.id + "']"
                  )
                : string
        } catch {
            return string
        }
    }

    const programRules = (await get(
        'programRules.json?paging=false&fields=condition,programRuleActions[programRuleActionType,dataElement[id,name],programStageSection[name,id]]&filter=program.id:eq:' +
            amrProgramId
    )).programRules

    const programVariables = (await get(
        'programRuleVariables.json?paging=false&fields=name,dataElement[id,name]&filter=program.id:eq:' +
            amrProgramId
    )).programRuleVariables

    let dataElementRules = {}
    let sectionRules = {}

    // Keys are element/section id to be hidden. Values are hide conditions.
    programRules.forEach(programRule =>
        programRule.programRuleActions.forEach(programRuleAction => {
            switch (programRuleAction.programRuleActionType) {
                case 'HIDEFIELD':
                    if (!dataElementRules[programRuleAction.dataElement.id])
                        dataElementRules[programRuleAction.dataElement.id] = []
                    dataElementRules[programRuleAction.dataElement.id].push(
                        getVar(programRule.condition)
                    )
                    return
                case 'HIDESECTION':
                    if (!sectionRules[programRuleAction.programStageSection.id])
                        sectionRules[
                            programRuleAction.programStageSection.id
                        ] = []
                    sectionRules[programRuleAction.programStageSection.id].push(
                        getVar(programRule.condition)
                    )
                    return
                default:
                    return
            }
        })
    )

    return {
        dataElementRules: dataElementRules,
        sectionRules: sectionRules,
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
        if (key === amrDataElement)
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
        program: amrProgramId,
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
                programStageId +
                '&filter=' +
                amrDataElement +
                ':eq:' +
                amrId
        )).height !== 0
    )
        amrId = newCode()
    return amrId
}

/**
 * Updates event with new values.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 */
export async function updateEvent(values, testFields, eventId) {
    let data = await get('events/' + eventId + '.json')

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

    for (let dataElement in values) {
        const dataE = data.dataValues.find(
            dataValue => dataValue.dataElement === dataElement
        )
        !dataE
            ? data.dataValues.push({
                  dataElement: dataElement,
                  value: values[dataElement],
              })
            : (dataE.value = values[dataElement])
    }

    await put('events/' + eventId, data)
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
