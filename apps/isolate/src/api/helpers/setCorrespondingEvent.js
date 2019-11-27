import { putEvent } from '@hisp-amr/api'
import { COMPLETED } from '@hisp-amr/app'
import { assignDataValues } from './assignDataValues'

/**
 * Pushes the new corresponding event and event type.
 * @param {string} event - Event ID
 * @param {string} corresponding - Corresponding event
 * @param {string} type - Event type
 * @returns {Promise}
 */
export const setCorrespondingEvent = async (event, corresponding, type) =>
    await putEvent({
        ...event,
        status: COMPLETED,
        dataValues: assignDataValues(event.dataValues, corresponding, type),
    })
