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
    { completed, newRecord }
) => {
    const shouldDisable = id => {
        switch (id) {
            case AMR_ELEMENT:
                return values[AMR_ELEMENT] && values[AMR_ELEMENT] !== ''
            case ORGANISM_ELEMENT:
                return (
                    values[ORGANISM_ELEMENT] && values[ORGANISM_ELEMENT] !== ''
                )
            case L1_APPROVAL_STATUS:
            case L1_REJECTION_REASON:
            case L1_REVISION_REASON:
                return (
                    values[L1_APPROVAL_STATUS] === APPROVED ||
                    values[L1_APPROVAL_STATUS] === REJECTED ||
                    values[L2_APPROVAL_STATUS] === REJECTED
                )
            case L2_APPROVAL_STATUS:
            case L2_REJECTION_REASON:
            case L2_REVISION_REASON:
                return (
                    values[L2_APPROVAL_STATUS] === APPROVED ||
                    values[L2_APPROVAL_STATUS] === REJECTED ||
                    values[L1_APPROVAL_STATUS] === REJECTED
                )
            default:
                if (newRecord) return false
                else
                    return !(
                        (values[L2_APPROVAL_STATUS] === RESEND &&
                            values[L1_APPROVAL_STATUS] !== REJECTED) ||
                        (values[L1_APPROVAL_STATUS] === RESEND ||
                            values[L1_APPROVAL_STATUS] === '' ||
                            !values[L1_APPROVAL_STATUS])
                    )
        }
    }

    const programStage = JSON.parse(JSON.stringify(pStage))

    Object.keys(programStage.dataElements).forEach(id => {
        const dataElement = programStage.dataElements[id]
        dataElement.disabled = shouldDisable(id)
        if (dataElement.optionSet)
            dataElement.optionSet = dataElement.optionSet.id
        if (!values[id]) values[id] = ''
    })

    programStage.programStageSections.forEach(s => {
        s.hideWithValues =
            s.name === 'Results' ||
            (s.name === 'Approval' &&
                !values[L1_APPROVAL_STATUS] &&
                !values[L2_APPROVAL_STATUS])
    })

    const status = {
        deletable:
            values === {} ||
            (!values[L1_APPROVAL_STATUS] && !values[L2_APPROVAL_STATUS]),
        editable:
            values === {} ||
            (!values[L1_APPROVAL_STATUS] && !values[L2_APPROVAL_STATUS]) ||
            [values[L1_APPROVAL_STATUS], values[L2_APPROVAL_STATUS]].includes(
                RESEND
            ),
        finished:
            (values[L1_APPROVAL_STATUS] === values[L2_APPROVAL_STATUS]) ===
            APPROVED,
        completed: completed,
    }

    return { programStage, status, eventValues: values }
}
