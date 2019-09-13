import { getRecord, getEvent, ACTIVE, postEvent } from '@amr/app'
import { assignDataValues, setCorrespondingEvent } from './helpers'
import {
    CORRESPONDING_EVENT_ELEMENT,
    EVENT_TYPE_ELEMENT,
} from '../constants/dhis2'
import { EVENT, ISOLATE } from '../constants/eventTypes'

/**
 * Checks if the event type is isolate.
 * @param {Object[]} dataValues
 * @returns {boolean} - True if isolate.
 */
const isIsolateType = dataValues => {
    const type = dataValues.find(dv => dv.dataElement === EVENT_TYPE_ELEMENT)
    return type ? type.value === ISOLATE : false
}

/**
 * Finds the corresponding event data value.
 * @param {Object[]} dataValues
 * @returns {Object}
 */
const findCorrespondingEvent = dataValues =>
    dataValues.find(dv => dv.dataElement === CORRESPONDING_EVENT_ELEMENT)

/**
 * Posts a new event with the same values,
 * with the exception of 'Is Isolate' set to true.
 * @param {Object} event
 * @returns {string} - Event ID
 */
const postIsolate = async event =>
    await postEvent({
        dataValues: assignDataValues(event.dataValues, event.event, ISOLATE),
        enrollment: event.enrollment,
        eventDate: event.eventDate,
        orgUnit: event.orgUnit,
        program: event.program,
        programStage: event.programStage,
        status: ACTIVE,
        trackedEntityInstance: event.trackedEntityInstance,
    })

/**
 * If the supplied event has an isolate it gets the isolate record.
 * Otherwise, it creates the an isolate record.
 * @param {Objecy} programs
 * @param {string} eventId
 * @returns {Object} - Isolate record
 */
export const fetchIsolate = async (programs, eventId) => {
    const getIsolate = async id => await getRecord(programs, id, true)

    const event = await getEvent(eventId)

    const correspondingEvent = findCorrespondingEvent(event.dataValues)
    const isIsolate = isIsolateType(event.dataValues)

    // Is isolate
    if (isIsolate) return await getIsolate(eventId)

    // Existing isolate
    if (correspondingEvent) {
        try {
            const isolate = await getIsolate(correspondingEvent.value)
            return isolate
        } catch (error) {
            if (error !== 404) throw error
        }
    }

    // Create isolate
    const isolateId = await postIsolate(event)
    setCorrespondingEvent(event, isolateId, EVENT)
    return await getIsolate(isolateId)
}
