import { request } from './request'
import { get } from './crud'
import { getRecord } from './getRecord'
import { getEvent } from './getEvent'
import { AMR_ELEMENT, IS_ISOLATE_ELEMENT } from 'constants/dhis2'
import { ACTIVE } from 'constants/eventStatus'
import { postEvent } from './postEvent'

/**
 * Posts a new event with the same values,
 * with the exception of 'Is Isolate' set to true.
 * @param {object} event
 * @returns {string} - Event ID
 */
const postIsolate = async event =>
    await postEvent({
        dataValues: [
            ...event.dataValues,
            {
                dataElement: IS_ISOLATE_ELEMENT,
                value: true,
            },
        ],
        enrollment: event.enrollment,
        eventDate: event.eventDate,
        orgUnit: event.orgUnit,
        program: event.program,
        programStage: event.programStage,
        status: ACTIVE,
        trackedEntityInstance: event.trackedEntityInstance,
    })

const findIsolate = async (eventId, amrId, trackedEntityInstance) => {
    const events = (await get(
        request('events', {
            fields: 'event',
            filters: `${AMR_ELEMENT}:eq:${amrId}`,
            options: [`trackedEntityInstance=${trackedEntityInstance}`],
        })
    )).events

    const isolate = events.find(event => event.event !== eventId)

    return isolate ? isolate.event : false
}

/**
 * If the supplied event ID is or has an isolate it gets the isolate record.
 * Otherwise, it creates the an isolate record.
 * @param {objecy} programs
 * @param {string} eventId
 * @returns {object} - Isolate record
 */
export const fetchIsolate = async (programs, eventId) => {
    const event = await getEvent(eventId)

    if (event.dataValues.find(dv => dv.dataElement === IS_ISOLATE_ELEMENT))
        return await getRecord(programs, eventId)

    const hasIsolate = await findIsolate(
        eventId,
        event.dataValues.find(dv => dv.dataElement === AMR_ELEMENT).value,
        event.trackedEntityInstance
    )

    if (hasIsolate) return await getRecord(programs, hasIsolate)

    return await getRecord(programs, await postIsolate(event))
}
