import moment from 'moment'
import { get, post, del, put, setBaseUrl } from './crud'
import { request } from './request'
import {
    _organismsDataElementId,
    _testResultDataElementId,
    _sampleIdElementId,
    _amrDataElement,
    _personTypeId,
    _l1ApprovalStatus,
    _l1RevisionReason,
    _l2ApprovalStatus,
    _l2RevisionReason,
} from './constants'
import {
    getProgramStage,
    getEventValues,
    setEventValues,
    generateAmrId,
    getSqlView,
} from './internal'

export const _organismsDataElementId = 'SaQe2REkGVw'
export const _testResultDataElementId = 'bSgpKbkbVGL'
export const _sampleIdElementId = 'GpAu5HjWAEz'
const _amrDataElement = 'lIkk661BLpG'

const _personTypeId = 'tOJvIFXsB5V'

const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RevisionReason = 'fEnFVvEFKVc'

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
            options: [`ou=${ou}`, `trackedEntityType=${_personTypeId}`],
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

    let values = {}
    attributes.forEach(a => (values[a.attribute] = a.value))

    return values
}

/**
 * Adds a new person..
 * @param {Object} values - Values
 * @returns {string} Tracked entity instance ID.
 */
export const addPerson = async (values, orgUnit) => {
    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: orgUnit,
        attributes: [],
    }
    for (let key in values)
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
    let data = await get(url)
    data.attributes = []
    for (let key in values)
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
    orgaCode,
    ou,
    eId,
    eValues,
    sampleDate,
    orgUnitCode
) => {
    let initialValues = {
        [_organismsDataElementId]: orgaCode,
        [_amrDataElement]: await generateAmrId(ou, orgUnitCode),
    }
    const { entityId, eventId } = eId
        ? await addEvent(
              initialValues,
              pId,
              pStage.id,
              ou,
              eId,
              eValues,
              sampleDate
          )
        : await addPersonWithEvent(
              initialValues,
              pId,
              pStage.id,
              ou,
              eValues,
              sampleDate
          )

    const { programStage, eventValues, status } = await getProgramStage(
        pStage,
        initialValues,
        false,
        true
    )

    return { programStage, eventValues, status, eventId, entityId }
}

export const existingRecord = async (
    programs,
    eventId,
    { isApproval, l1Member, l2Member }
) => {
    let {
        eventValues: initialValues,
        programId,
        programStageId,
        completed,
        entityId,
        sampleDate,
    } = await getEventValues(eventId)
    const lol = programs
        .find(p => p.id === programId)
        .programStages.find(ps => (ps.id = programStageId))
    const pStage = { ...lol }
    const { programStage, eventValues, status } = !isApproval
        ? await getProgramStage(pStage, initialValues, completed, false)
        : await getProgramStage(
              pStage,
              initialValues,
              completed,
              false,
              l1Member,
              l2Member
          )

    return {
        programId,
        programStage,
        eventValues,
        status,
        eventId,
        entityId,
        sampleDate,
    }
}

export const addPersonWithEvent = async (
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityValues,
    sampleDate
) => {
    let event = await setEventValues(
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
    programStageId,
    orgUnitId,
    entityId,
    entityValues,
    sampleDate
) => {
    let event = await setEventValues(
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

export const setEventStatus = async (eventId, completed, isApproval) => {
    const url = `events/${eventId}`

    let event = await get(url)
    event.status = completed ? 'COMPLETED' : 'ACTIVE'
    if (!isApproval) {
        let values = {}
        event.dataValues.forEach(
            dataValue => (values[dataValue.dataElement] = dataValue.value)
        )
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

export const getEvents = async (config, orgUnit, { username, l2Member }) =>
    await getSqlView(
        config.sqlViews.table.length === 1
            ? config.sqlViews.table[0]
            : l2Member
            ? config.sqlViews.table[1]
            : config.sqlViews.table[0],
        orgUnit,
        {
            user: username ? username : false,
            status: config.param ? config.status : false,
        }
    )

export const getCounts = async (configs, orgUnit, { username, l2Member }) => {
    for (let config of configs)
        config.count = (await getSqlView(
            config.sqlViews.count.length === 1
                ? config.sqlViews.count[0]
                : l2Member
                ? config.sqlViews.count[1]
                : config.sqlViews.count[0],
            orgUnit,
            {
                user: username ? username : false,
                status: config.param ? config.status : false,
            }
        ))[0][0]
    return configs
}

export const isDuplicate = async (
    event,
    entity,
    programStage,
    organism,
    sampleId,
    date,
    days
) => {
    let events = (await get(
        request('events/query', {
            order: 'created:asc',
            filters: [
                `${_sampleIdElementId}:eq:${sampleId}`,
                `${_organismsDataElementId}:eq:${organism}`,
            ],
            options: [
                `trackedEntityInstance=${entity}`,
                `programStage=${programStage}`,
            ],
        })
    )).rows

    if (!events) return false
    if (events.length < 1) return false
    if (events[0][0] === event) return false
    events = events.filter(e => e[0] !== event)
    if (events.length < 1) return false

    days = parseInt(days)
    date = moment(date)
    const min = date.clone().subtract(days, 'days')
    const max = date.clone().add(days, 'days')
    return events.find(e => moment(e[7]) > min && moment(e[7]) < max) !== null
}
