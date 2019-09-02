//import moment from 'moment'
import { get, post, del, put, setBaseUrl } from './crud'
import { request } from './request'
import {
    ORGANISM_ELEMENT,
    SAMPLE_ID_ELEMENT,
    AMR_ELEMENT,
    PERSON_TYPE,
    L1_APPROVAL_STATUS,
    L1_REVISION_REASON,
    L2_APPROVAL_STATUS,
    L2_REVISION_REASON,
} from 'constants/dhis2'
import {
    getProgramStage,
    getEventValues,
    setEventValues,
    generateAmrId,
    getSqlView,
} from './internal'
import * as DUPLICACY from 'constants/duplicacy'

/**
 * Sets the base URL, username, and user groups.
 * @param {String} baseUrl - Base URL.
 */
export const init = baseUrl => setBaseUrl(baseUrl)

/**
 * Checks if any tracked entity instance has property with value.
 * @param {string} property - Property.
 * @param {string} value - Value.
 * @returns {boolean} - False if unique, tracked entity instance ID otherwise.
 */
export const checkUnique = async (property, value, ou) => {
    const entities = (await get(
        request('trackedEntityInstances', {
            fields: 'trackedEntityInstance',
            filters: `${property}:eq:${value}`,
            options: [`ou=${ou}`, `trackedEntityType=${PERSON_TYPE}`],
        })
    )).trackedEntityInstances
    return !entities
        ? false
        : entities.length > 0
        ? entities[0].trackedEntityInstance
        : false
}

/**
 * Gets tracked entity instance values.
 * @param {string} entityId - Tracked entity instance ID.
 * @returns {Object} Values.
 */
export const getPersonValues = async entityId => {
    const attributes = (await get(
        request(`trackedEntityInstances/${entityId}`, {
            fields: 'attributes[code,displayName,valueType,attribute,value]',
            options: ['ouMode=ALL'],
        })
    )).attributes

    if (!attributes) return null

    const values = {}
    attributes.forEach(a => (values[a.attribute] = a.value))

    return values
}

/**
 * Adds a new person..
 * @param {Object} values - Values
 * @returns {string} Tracked entity instance ID.
 */
export const addPerson = async (values, orgUnit) => {
    const data = {
        trackedEntityType: PERSON_TYPE,
        orgUnit: orgUnit,
        attributes: [],
    }
    for (const key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    return (await (await post('trackedEntityInstances', data)).json()).response
        .importSummaries[0].reference
}

/**
 * Updates a person.
 * @param {string} id - Tracked entity instance id.
 * @param {Object} values - Values.
 */
export const updatePerson = async (id, values) => {
    const url = `trackedEntityInstances/${id}`
    const data = await get(url)
    data.attributes = []
    for (const key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    await put(url, data)
}

/**
 * Deletes a tracked entity instance.
 * @param {string} id - Tracked entity instance.
 */
export const deletePerson = async id =>
    await del(`trackedEntityInstances/${id}`)

export const newRecord = async (
    pId,
    pStage,
    { orgaCode, ou, eId, eValues, sampleDate, orgUnitCode }
) => {
    const initialValues = {
        [ORGANISM_ELEMENT]: orgaCode,
        [AMR_ELEMENT]: await generateAmrId(ou, orgUnitCode),
    }
    const { entityId, eventId } = eId
        ? await addEvent(initialValues, pId, {
              programStageId: pStage.id,
              orgUnitId: ou,
              entityId: eId,
              entityValues: eValues,
              sampleDate,
          })
        : await addPersonWithEvent(initialValues, pId, {
              programStageId: pStage.id,
              orgUnitId: ou,
              entityValues: eValues,
              sampleDate,
          })

    const { programStage, eventValues, status } = await getProgramStage(
        pStage,
        initialValues,
        { completed: false, newRecord: true }
    )

    return { programStage, eventValues, status, eventId, entityId }
}

export const existingRecord = async (programs, eventId) => {
    const {
        eventValues: initialValues,
        programId: program,
        programStageId,
        completed,
        entityId,
        sampleDate,
    } = await getEventValues(eventId)
    const pStage = programs
        .find(p => p.id === program)
        .programStages.find(ps => (ps.id = programStageId))
    const { programStage, eventValues, status } = await getProgramStage(
        pStage,
        initialValues,
        {
            completed,
            newRecord: false,
        }
    )
    const entityValues = await getPersonValues(entityId)

    return {
        program,
        programStage,
        eventValues,
        status,
        eventId,
        entityId,
        sampleDate,
        entityValues,
    }
}

export const addPersonWithEvent = async (
    eventValues,
    programId,
    { programStageId, orgUnitId, entityValues, sampleDate }
) => {
    const event = await setEventValues(
        {
            dataValues: [],
            eventDate: sampleDate,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            status: 'ACTIVE',
        },
        eventValues
    )

    const data = {
        trackedEntityType: PERSON_TYPE,
        orgUnit: event.orgUnit,
        attributes: Object.keys(entityValues).map(key => {
            return { attribute: key, value: entityValues[key] }
        }),
        enrollments: [
            {
                orgUnit: event.orgUnit,
                program: event.program,
                enrollmentDate: sampleDate,
                incidentDate: sampleDate,
                events: [event],
            },
        ],
    }

    const r = await post('trackedEntityInstances', data)

    return {
        entityId: r.response.importSummaries[0].reference,
        eventId:
            r.response.importSummaries[0].enrollments.importSummaries[0].events
                .importSummaries[0].reference,
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
export const addEvent = async (
    eventValues,
    programId,
    { programStageId, orgUnitId, entityId, entityValues, sampleDate }
) => {
    const event = await setEventValues(
        {
            dataValues: [],
            eventDate: sampleDate,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            trackedEntityInstance: entityId,
            status: 'ACTIVE',
        },
        eventValues
    )

    if (entityValues) await updatePerson(entityId, entityValues)

    // Enrolling if not already enrolled.
    let enrollments = []
    enrollments = (await get(
        request(`trackedEntityInstances/${entityId}`, {
            fields: 'enrollments[program]',
        })
    )).enrollments
    if (!enrollments.find(enrollment => enrollment.program === programId)) {
        await post('enrollments', {
            trackedEntityInstance: entityId,
            orgUnit: orgUnitId,
            program: programId,
            enrollmentDate: sampleDate,
            incidentDate: sampleDate,
        })
    }

    const r = await post('events', event)

    return {
        entityId,
        eventId: r.response.importSummaries[0].reference,
    }
}

export const setEventStatus = async (eventId, completed) => {
    const url = `events/${eventId}`

    let event = await get(url)
    event.status = completed ? 'COMPLETED' : 'ACTIVE'

    const values = {}
    event.dataValues.forEach(
        dataValue => (values[dataValue.dataElement] = dataValue.value)
    )
    if (values[L1_APPROVAL_STATUS] === 'Resend') {
        values[L1_APPROVAL_STATUS] = ''
        values[L1_REVISION_REASON] = ''
    }
    if (values[L2_APPROVAL_STATUS] === 'Resend') {
        values[L2_APPROVAL_STATUS] = ''
        values[L2_REVISION_REASON] = ''
    }
    event = await setEventValues(event, values)

    await put(url, event)
}

export const updateEventValue = (eventId, dataElementId, value) =>
    put(`events/${eventId}/${dataElementId}`, {
        dataValues: [{ dataElement: dataElementId, value: value }],
    })

/**
 * Deletes event.
 * @param {string} eventId - Event ID.
 */
export const deleteEvent = async eventId => await del(`events/${eventId}`)

export const getEvents = async (config, orgUnit, username) =>
    await getSqlView(config.sqlViews.table, orgUnit, {
        user: username,
        status: config.param ? config.status : false,
    })

export const getCounts = async (configs, orgUnit, username) => {
    for (const config of configs)
        config.count = (await getSqlView(config.sqlViews.count, orgUnit, {
            user: username,
            status: config.param ? config.status : false,
        }))[0][0]
    return configs.map(config => config.count)
}

export const isDuplicateRecord = async ({
    event,
    entity,
    organism,
    sampleId,
}) => {
    let events = (await get(
        request('events', {
            order: 'created:asc',
            fields: 'event,dataValues[dataElement,value]',
            filters: `${SAMPLE_ID_ELEMENT}:eq:${sampleId}`,
            options: [`trackedEntityInstance=${entity}`],
        })
    )).events

    if (!events) return false
    if (events.length < 1) return false
    if (events[0].event === event) return false
    events = events.filter(e => e.event !== event)
    if (events.length < 1) return false
    return events.find(e =>
        e.dataValues.find(
            dv => dv.dataElement === ORGANISM_ELEMENT && dv.value === organism
        )
    )
        ? DUPLICACY.DUPLICATE_ERROR
        : DUPLICACY.DUPLICATE_WARNING
}
