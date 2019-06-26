import { get } from './crud'
import { request } from './request'
import {
    _organismsDataElementId,
    _amrDataElement,
    _l1ApprovalStatus,
    _l1RejectionReason,
    _l1RevisionReason,
    _l2ApprovalStatus,
    _l2RejectionReason,
    _l2RevisionReason,
} from './constants'

export const getSqlView = async (sqlView, orgUnit, { user, status }) =>
    (await get(
        request(`sqlViews/${sqlView}/data`, {
            options: [
                `var=orgunit:${orgUnit}`,
                ...(user ? [`var=username:${user}`] : []),
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
    const event = await get(`events/${eventId}`)
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
                filters: `${_amrDataElement}:eq:${amrId}`,
                options: [`orgUnit=${orgUnitId}`],
            })
        )).events.length !== 0
    )
        amrId = newId()

    return amrId
}

export const getProgramStage = async (
    programStage,
    values,
    { completed, newRecord, l1Member, l2Member }
) => {
    const shouldDisable = id => {
        switch (id) {
            case _amrDataElement:
                return values[_amrDataElement] && values[_amrDataElement] !== ''
            case _organismsDataElementId:
                return (
                    values[_organismsDataElementId] &&
                    values[_organismsDataElementId] !== ''
                )
            case _l1ApprovalStatus:
            case _l1RejectionReason:
            case _l1RevisionReason:
                return (
                    !l1Member ||
                    values[_l1ApprovalStatus] === 'Approved' ||
                    values[_l1ApprovalStatus] === 'Rejected' ||
                    values[_l2ApprovalStatus] === 'Rejected'
                )
            case _l2ApprovalStatus:
            case _l2RejectionReason:
            case _l2RevisionReason:
                return (
                    !l2Member ||
                    values[_l2ApprovalStatus] === 'Approved' ||
                    values[_l2ApprovalStatus] === 'Rejected' ||
                    values[_l1ApprovalStatus] === 'Rejected'
                )
            default:
                if (newRecord) return false
                else if (l1Member || l2Member) return true
                else
                    return !(
                        (values[_l2ApprovalStatus] === 'Resend' &&
                            values[_l1ApprovalStatus] !== 'Rejected') ||
                        (values[_l1ApprovalStatus] === 'Resend' ||
                            values[_l1ApprovalStatus] === '' ||
                            !values[_l1ApprovalStatus])
                    )
        }
    }

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
                !l1Member &&
                !l2Member &&
                !values[_l1ApprovalStatus] &&
                !values[_l2ApprovalStatus])
    })

    const status = {
        deletable:
            values === {} ||
            (!values[_l1ApprovalStatus] && !values[_l2ApprovalStatus]),
        editable:
            values === {} ||
            (!values[_l1ApprovalStatus] && !values[_l2ApprovalStatus]) ||
            [values[_l1ApprovalStatus], values[_l2ApprovalStatus]].includes(
                'Resend'
            ) ||
            (l2Member && !values[_l2ApprovalStatus]),
        finished:
            (values[_l1ApprovalStatus] === values[_l2ApprovalStatus]) ===
            'Approved',
        completed: completed,
    }

    return { programStage, status, eventValues: values }
}
