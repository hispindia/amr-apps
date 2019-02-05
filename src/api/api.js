import { get, postData, del, put } from './crud'
import * as moment from 'moment'
import { removeTime } from '../helpers/date'

const config = require('../config/config.json')

let amrProgramId = ''
let personId = ''
let entityLabel = ''
let programStageId = ''
let organismProgramId = ''
let organismElementId = ''
let amrDataElement = ''

/**
 * Gets entity label.
 * @returns {string} Entity Label.
 */
export function getEntityLabel() {
    return entityLabel
}

/**
 * Sets the id of the AMR program, AMR program, and person for later use.
 */
export async function setAmrProgram() {
    const program = (await get(
        'programs.json?filter=shortName:eq:AMR&paging=false&fields=id,trackedEntityType[id,displayName],programStages'
    )).programs[0]
    amrProgramId = program.id
    personId = program.trackedEntityType.id
    entityLabel = program.trackedEntityType.displayName
    programStageId = program.programStages[0].id

    const organismProgram = (await get(
        'programs.json?filter=code:eq:organism&paging=false&fields=id,trackedEntityType[id,displayName]'
    )).programs[0]
    organismProgramId = organismProgram.id

    organismElementId = (await get(
        'trackedEntityAttributes.json?filter=code:eq:organism&paging=false'
    )).trackedEntityAttributes[0].id

    amrDataElement = (await get(
        'dataElements.json?filter=code:eq:AMR%20Id&paging=false'
    )).dataElements[0].id
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
            'trackedEntityInstances.json?ouMode=ALL&fields=trackedEntityInstance,attributes[code,displayName,valueType,attribute,value]&filter=RkCL8PAxV22:eq:' +
                patientRegNr
        )).trackedEntityInstances[0]
    } catch {
        return null
    }
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
 * Gets all person tracked entity instances.
 * @returns {Object} Headers with medadata and rows with data.
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

    let getAttributeValue = (index, id) => {
        for (let i = 0; i < values[index].attributes.length; i++) {
            if (values[index].attributes[i].attribute === id)
                return values[index].attributes[i].value
        }
        return ''
    }

    for (let i = 0; i < metaData.length; i++)
        data.headers.push({
            name: metaData[i].trackedEntityAttribute.displayName,
            id: metaData[i].trackedEntityAttribute.id,
            options: { display: i < 4 },
        })
    for (let i = 0; i < values.length; i++) {
        let entityValues = [
            removeTime(values[i].created),
            removeTime(values[i].lastUpdated),
            values[i].enrollments[0].orgUnitName,
        ]
        for (let j = 3; j < data.headers.length; j++)
            entityValues.push(getAttributeValue(i, data.headers[j].id))
        data.rows.push(entityValues)
    }
    return data
}

export async function getOrganisms() {
    const data = (await get(
        'trackedEntityInstances.json?ouMode=ALL&order=created:desc&paging=false&fields=trackedEntityInstance,attributes[displayName,attribute,value]&program=' +
            organismProgramId
    )).trackedEntityInstances

    let getValue = index => {
        for (let i = 0; i < data[index].attributes.length; i++) {
            if (data[index].attributes[i].attribute === organismElementId)
                return data[index].attributes[i].value
        }
        return ''
    }

    let organisms = []
    for (let i = 0; i < data.length; i++) {
        let value = getValue(i)
        organisms.push({
            value: data[i].trackedEntityInstance,
            label: value,
        })
    }

    organisms.sort((a, b) =>
        a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    )
    return organisms
}

/**
 * Gets all events from the AMR program.
 * @returns {Object[]} All AMR events.
 */
export async function getEvents() {
    const events = (await get(
        'events.json?order=created:desc&paging=false&program=' +
            amrProgramId +
            '&fields=orgUnitName,lastUpdated,created,storedBy,dataValues[*]'
    )).events
    let data = {
        headers: [
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

    for (let i = 0; i < events.length; i++)
        data.rows.push([
            events[i].orgUnitName,
            events[i].storedBy,
            removeTime(events[i].created),
            removeTime(events[i].lastUpdated),
        ])

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
 * Gets AMR program stage.
 * @returns {Object} AMR program stage.
 */
export async function getProgramStage(orgUnit) {
    let programStage = await get(
        'programStages/' +
            programStageId +
            '.json?fields=displayName,programStageDataElements[dataElement[id],compulsory,sortOrder],programStageSections[id,name,displayName,dataElements[id,displayFormName,code,valueType,optionSetValue,optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]'
    )

    let getIndex = dataElementId => {
        for (let i = 0; i < programStage.programStageDataElements.length; i++)
            if (
                programStage.programStageDataElements[i].dataElement.id ===
                dataElementId
            )
                return i
        return -1
    }

    let values = {}
    const { dataElementRules, sectionRules } = await getProgramRules()

    for (let i = 0; i < programStage.programStageSections.length; i++) {
        if (sectionRules[programStage.programStageSections[i].id])
            programStage.programStageSections[i].hideCondition =
                sectionRules[programStage.programStageSections[i].id]
        for (
            let j = 0;
            j < programStage.programStageSections[i].dataElements.length;
            j++
        ) {
            let index = getIndex(
                programStage.programStageSections[i].dataElements[j].id
            )
            // Adding required and sort order properties.
            if (
                programStage.programStageSections[i].dataElements[j].code ===
                'AMR Id'
            )
                values[
                    programStage.programStageSections[i].dataElements[j].id
                ] = await generateAmrId(orgUnit)
            else
                values[
                    programStage.programStageSections[i].dataElements[j].id
                ] = ''
            programStage.programStageSections[i].dataElements[j].required =
                programStage.programStageDataElements[index].compulsory
            programStage.programStageSections[i].dataElements[j].sortOrder =
                programStage.programStageDataElements[index].sortOrder
            if (
                dataElementRules[
                    programStage.programStageSections[i].dataElements[j].id
                ]
            )
                programStage.programStageSections[i].dataElements[
                    j
                ].hideCondition =
                    dataElementRules[
                        programStage.programStageSections[i].dataElements[j].id
                    ]
            if (
                programStage.programStageSections[i].dataElements[j]
                    .optionSetValue
            ) {
                let options = []
                for (
                    let h = 0;
                    h <
                    programStage.programStageSections[i].dataElements[j]
                        .optionSet.options.length;
                    h++
                )
                    options.push({
                        value:
                            programStage.programStageSections[i].dataElements[j]
                                .optionSet.options[h].id,
                        label:
                            programStage.programStageSections[i].dataElements[j]
                                .optionSet.options[h].displayName,
                    })
                programStage.programStageSections[i].dataElements[
                    j
                ].optionSet.options = options
            }
        }
    }

    let getSectionIndex = sectionName => {
        for (let i = 0; i < programStage.programStageSections.length; i++)
            if (programStage.programStageSections[i].name === sectionName)
                return i
        return -1
    }

    for (let i = 0; i < programStage.programStageSections.length; i++) {
        // Section that have child sections.
        if (
            config.eventForm.specialSections[
                programStage.programStageSections[i].name
            ]
        ) {
            let childSections = []
            for (let j in config.eventForm.specialSections[
                programStage.programStageSections[i].name
            ]) {
                let index = getSectionIndex(
                    config.eventForm.specialSections[
                        programStage.programStageSections[i].name
                    ][j]
                )
                if (index !== -1) {
                    childSections.push(programStage.programStageSections[index])
                    programStage.programStageSections.splice(index, 1)
                }
            }
            programStage.programStageSections[i].childSections = childSections
        }
    }

    return {
        programStage: programStage,
        values: values,
    }
}

export async function getProgramRules() {
    let getVar = string => {
        const varName = string.match('#{(.*)}')[1]
        for (let i = 0; i < programVariables.length; i++)
            if (programVariables[i].name === varName)
                return string.replace(
                    /#{(.*)}/,
                    "this.state.values['" +
                        programVariables[i].dataElement.id +
                        "']"
                )
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
    for (let i = 0; i < programRules.length; i++) {
        for (let j = 0; j < programRules[i].programRuleActions.length; j++) {
            if (
                programRules[i].programRuleActions[j].programRuleActionType ===
                'HIDEFIELD'
            )
                dataElementRules[
                    programRules[i].programRuleActions[j].dataElement.id
                ] = getVar(programRules[i].condition)
            else if (
                programRules[i].programRuleActions[j].programRuleActionType ===
                'HIDESECTION'
            )
                sectionRules[
                    programRules[i].programRuleActions[j].programStageSection.id
                ] = getVar(programRules[i].condition)
        }
    }
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
    // Getting the id's of the users OU's.
    const maxLevel = (await get(
        'organisationUnits.json?fields=level&pageSize=1&order=level:desc'
    )).organisationUnits[0].level
    let childrenString = ''
    for (let i = 0; i < maxLevel; i++)
        childrenString += ',children[id,displayName'
    for (let i = 0; i < maxLevel; i++) childrenString += ']'
    const userOrgUnits = (await get('me.json?fields=organisationUnits'))
        .organisationUnits
    let orgUnitsString = '[' + userOrgUnits[0].id
    for (let i = 1; i < userOrgUnits.length; i++)
        orgUnitsString += ',' + userOrgUnits[i].id
    orgUnitsString += ']'

    // Getting the OU's with descendants.
    let data = (await get(
        'organisationUnits.json?filter=id:in:' +
            orgUnitsString +
            '&paging=false&order=level:asc&fields=id,displayName' +
            childrenString
    )).organisationUnits

    const sortChildren = orgUnit => {
        if (orgUnit.children)
            if (orgUnit.children.length) {
                for (let i = 0; i < orgUnit.children.length; i++)
                    sortChildren(orgUnit.children[i])
                orgUnit.children.sort((a, b) =>
                    a.displayName > b.displayName
                        ? 1
                        : b.displayName > a.displayName
                        ? -1
                        : 0
                )
            }
    }

    // Sorting children by display name.
    for (let i = 0; i < data.length; i++) sortChildren(data[i])

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
    for (let key in values)
        dataValues.push({
            dataElement: key,
            value: values[key],
        })
    let data = {
        program: amrProgramId,
        orgUnit: orgUnitId,
        eventDate: date ? date : moment().format('YYYY-MM-DD'),
        dataValues: dataValues,
    }
    await postData('events/', data)
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
    let amrId = orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)
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
        amrId = orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)
    return amrId
}
