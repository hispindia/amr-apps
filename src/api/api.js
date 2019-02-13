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

const dataEntryGroup = 'mYdK5QT4ndl'
const l1ApprovalGroup = 'O7EtwlwnAYq'
const l2ApprovalGroup = 'XigjUyZB8UE'

const dataEntryUserGroup = 'mYdK5QT4ndl'
const l1UserGroup = 'O7EtwlwnAYq'
const l2UserGroup = 'XigjUyZB8UE'

const organismDataElementId = 'SaQe2REkGVw'

/**
 * Gets entity label.
 * @returns {string} Entity Label.
 */
export function getEntityLabel() {
    return entityLabel
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
 * Gets tracked entity instance of type person by patient registration number.
 * @param {string} patientRegNr - Patient registration number.
 * @returns {Object} Tracked entity instance.
 */
export async function getPerson(patientRegNr) {
    try {
        return (await get(
            'trackedEntityInstances.json?ouMode=ALL&fields=trackedEntityInstance,enrollments[events[lastUpdated,created,storedBy,dataValues[dataElement,value]]],attributes[code,displayName,valueType,attribute,value]&filter=RkCL8PAxV22:eq:' +
                patientRegNr
        )).trackedEntityInstances[0]
    } catch {
        return null
    }
}

/**
 * Gets all events belonging to the tracked entity instance with the provided patient registration number.
 * @param {string} patientRegNr - Patient registration number.
 * @returns {Object} Events in the form of headers and rows.
 */
export async function getPersonsEvents(patientRegNr) {
    const enrollments = (await get(
        'trackedEntityInstances.json?ouMode=ALL&fields=enrollments[events[lastUpdated,created,orgUnitName,storedBy,dataValues[dataElement,value]]]&filter=RkCL8PAxV22:eq:' +
            patientRegNr
    )).trackedEntityInstances[0].enrollments

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
    enrollments.forEach(enrollment => {
        enrollment.events.forEach(event => {
            data.rows.push([
                getAmrId(event),
                event.orgUnitName,
                event.storedBy,
                removeTime(event.created),
                removeTime(event.lastUpdated),
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
            '&ouMode=DESCENDANTS&order=created:desc&paging=false&fields=created,lastUpdated,attributes[displayName,valueType,attribute,value],enrollments[orgUnitName]&program=' +
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
                name: 'Organisation Unit',
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

    // Adds the data rows.
    values.forEach(value => {
        let entityValues = [
            removeTime(value.created),
            removeTime(value.lastUpdated),
            value.enrollments[0].orgUnitName,
        ]
        data.headers
            .slice(3, data.headers.length)
            .forEach(header =>
                entityValues.push(getAttributeValue(value, header.id))
            )
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
export async function getEventValues(amrId) {
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
 * Gets all events from the AMR program with the provided approval status.
 * @param {string} approvalStatus - Approval status.
 * @returns {Object[]} All AMR events.
 */
export async function getEvents(orgUnit, approvalStatus) {
    const events = (await get(
        'events.json?paging=false&fields=orgUnitName,lastUpdated,created,storedBy,dataValues[dataElement,value]&program=' +
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
        ],
        rows: [],
    }

    const getAmrId = event => {
        const dataElement = event.dataValues.find(
            dataValue => dataValue.dataElement === amrDataElement
        )
        return dataElement > 0 ? dataElement.value : ''
    }

    events.forEach(event =>
        data.rows.push([
            getAmrId(event),
            event.orgUnitName,
            event.storedBy,
            removeTime(event.created),
            removeTime(event.lastUpdated),
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
    try {
        return (await get(
            'optionSets.json?paging=false&fields=options[name,displayName,id,code]&filter=code:eq:' +
                state
        )).optionSets[0].options
    } catch {
        return []
    }
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
            case l2ApprovalStatus:
            case l2RejectionReason:
            case l2RevisionReason:
                if (
                    !userGroups.includes(l2ApprovalGroup) ||
                    l1ApprovalStatus === ''
                )
                    element.disabled = true
        }
    }

    let values = typeof amrId === 'undefined' ? {} : await getEventValues(amrId)
    const { dataElementRules, sectionRules } = await getProgramRules()

    programStage.programStageSections.map(section => {
        // Adding section hide rules.
        if (sectionRules[section.id])
            section.hideCondition = sectionRules[section.id]
        section.dataElements.map(dataElement => {
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
                dataElement.optionSet.options.map(option =>
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
            config.eventForm.specialSections[programStageSection.name].map(
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
 */
export async function updateEvent(values) {
    let data = await get('events/' + values['event'] + '.json?fields=*')

    for (let dataElement in values) {
        // TODO:
        // There's probably a better way to get the event attributes. Maybe schemas?
        if (
            !config.eventAttributes.includes(dataElement) ||
            dataElement === amrDataElement
        ) {
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
    }

    await put('events/' + values['event'], data)
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

    return fields
}
