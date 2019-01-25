import { get, postData, del, put } from './crud'
import * as moment from 'moment'
import { removeTime } from '../helpers/date'

let amrId = ''
let personId = ''
let programStageId = ''

export async function setAmrProgram() {
    const program = (await get(
        'programs.json?filter=shortName:eq:AMR&paging=false&fields=id,trackedEntityType,programStages'
    )).programs[0]
    amrId = program.id
    personId = program.trackedEntityType.id
    programStageId = program.programStages[0].id
}

export async function getProgramAttributes() {
    return (await get(
        'programs/' +
            amrId +
            '/programTrackedEntityAttributes.json?fields=mandatory,sortOrder,trackedEntityAttribute[code,displayName,valueType,id,unique,name,optionSetValue,optionSet[options[code,name,id,displayName]]]'
    )).programTrackedEntityAttributes
}

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

export async function getPatient(patientRegNr) {
    try {
        return (await get(
            'trackedEntityInstances.json?ouMode=ALL&fields=trackedEntityInstance,attributes[code,displayName,valueType,attribute,value]&filter=RkCL8PAxV22:eq:' +
                patientRegNr
        )).trackedEntityInstances[0]
    } catch {
        return null
    }
}

export async function addPatient(values) {
    const orgUnit = 'ANGhR1pa8I5'
    const now = moment().format('YYYY-MM-DD')
    let data = {
        trackedEntityType: personId,
        orgUnit: orgUnit,
        attributes: [],
        enrollments: [
            {
                orgUnit: orgUnit,
                program: amrId,
                enrollmentDate: now,
                incidentDate: now,
            },
        ],
    }
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })
    await postData('trackedEntityInstances/', data)
}

export async function updatePatient(id, values) {
    let data = await get(
        'trackedEntityInstances/' + id + '.json?ouMode=ALL&fields=*'
    )
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })
    await put('trackedEntityInstances/' + id, data)
}

export async function deletePatient(id) {
    await del('trackedEntityInstances/' + id)
}

export async function getAllPatients() {
    let data = await get(
        'trackedEntityInstances/query.json?ouMode=ALL&order=created:desc&paging=false&program=' +
            amrId
    )
    for (let i = 0; i < data.headers.length; i++)
        data.headers[i].name = data.headers[i].column
    data.headers[0].options = { display: false }
    data.headers[1].options = { display: false }
    data.headers[2].options = { display: false }
    data.headers[3].options = { display: false }
    data.headers[5].options = { display: false }
    data.headers[6].options = { display: false }
    console.log(data)
    return data
}

export async function getEvents() {
    const events = (await get(
        'events.json?order=created:desc&paging=false&program=' +
            amrId +
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
    //console.log(events)
    for (let i = 0; i < events.length; i++)
        //console.log(events[i])
        data.rows.push([
            events[i].orgUnitName,
            events[i].storedBy,
            removeTime(events[i].created),
            removeTime(events[i].lastUpdated),
        ])
    return data
}

export async function getDistricts(state) {
    return (await get(
        'optionSets.json?paging=false&fields=options[name,displayName,id,code]&filter=code:eq:' +
            state
    )).optionSets[0].options
}

export async function getProgramStage() {
    let programStage = await get(
        'programStages/' +
            programStageId +
            '.json?fields=displayName,programStageDataElements[id,compulsory],programStageSections[id,displayName,sortOrder,dataElements[id,displayFormName,valueType,optionSetValue,optionSet[name,displayName,id,code,options[name,displayName,id,code]]]]'
    )
    console.log(programStage)
    return programStage
}
