import { getEvent } from '@hisp-amr/api'

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
