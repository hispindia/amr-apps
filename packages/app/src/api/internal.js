import { get } from './crud'
import { request } from './request'
import { getEvent } from './getEvent'
import {
    ORGANISM_ELEMENT,
    AMR_ELEMENT,
    L1_APPROVAL_STATUS,
    L1_REJECTION_REASON,
    L1_REVISION_REASON,
    L2_APPROVAL_STATUS,
    L2_REJECTION_REASON,
    L2_REVISION_REASON,
} from 'constants/dhis2'
import { APPROVED, RESEND, REJECTED } from 'constants/approval'

export const getSqlView = async (sqlView, orgUnit, { user, status }) =>
    (await get(
        request(`sqlViews/${sqlView}/data`, {
            options: [
                `var=orgunit:${orgUnit}`,
                `var=username:${user}`,
                ...(status ? [`var=status:${status}`] : []),
            ],
        })
    )).listGrid.rows

/**
 * Gets values for a single event.
 * @param {string} eventId - AMR Id.
 * @returns {Object} Event values.
 */
export const getEventValues = async eventId => {
    const event = await getEvent(eventId)
    if (event.httpStatusCode === 404) throw 404
    const values = {}

    if (event.dataValues)
        event.dataValues.forEach(
            dataValue => (values[dataValue.dataElement] = dataValue.value)
        )
    return {
        programId: event.program,
        programStageId: event.programStage,
        eventValues: values,
        completed: event.status === 'COMPLETED',
        entityId: event.trackedEntityInstance,
        sampleDate: event.eventDate,
    }
}

/**
 * Adds values to event.
 * @param {Object} event - Event.
 * @param {Object} values - New values.
 * @param {Object} testFields - Test fields meta data.
 * @returns {Object} Event.
 */
export const setEventValues = async (event, values) => {
    if (!event.dataValues) event.dataValues = []

    for (const dataElement in values) {
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

/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitId - Organisation unit ID.
 * @returns {string} AMR Id.
 */
export const generateAmrId = async (orgUnitId, orgUnitCode) => {
    const newId = () =>
        orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)

    let amrId = newId()
    while (
        (await get(
            request('events', {
                fields: 'event',
                filters: `${AMR_ELEMENT}:eq:${amrId}`,
                options: [`orgUnit=${orgUnitId}`],
            })
        )).events.length !== 0
    )
        amrId = newId()

    return amrId
}

export const getProgramStage = async (
    pStage,
    values,
    { completed, newRecord, isIsolate }
) => {
    const shouldDisable = id => {
        switch (id) {
            case AMR_ELEMENT:
                return values[AMR_ELEMENT] && values[AMR_ELEMENT] !== ''
            case ORGANISM_ELEMENT:
                return (
                    values[ORGANISM_ELEMENT] && values[ORGANISM_ELEMENT] !== ''
                )
            default:
                return isIsolate && !programStage.dataElements[id].editable
        }
    }

    const setEditable = dataElements =>
        dataElements.forEach(
            id => (programStage.dataElements[id].editable = true)
        )

    const programStage = JSON.parse(JSON.stringify(pStage))

    programStage.programStageSections.forEach(s => {
        if (s.editable) setEditable(s.dataElements)
        s.childSections.forEach(cs => {
            if (cs.editable) setEditable(cs.dataElements)
        })
    })

    Object.keys(programStage.dataElements).forEach(id => {
        const dataElement = programStage.dataElements[id]
        dataElement.disabled = shouldDisable(id)
        if (dataElement.optionSet)
            dataElement.optionSet = dataElement.optionSet.id
        if (!values[id]) values[id] = ''
    })

    const status = {
        deletable: !completed,
        editable: !completed,
        finished: completed,
        completed: completed,
    }

    return { programStage, status, eventValues: values }
}
