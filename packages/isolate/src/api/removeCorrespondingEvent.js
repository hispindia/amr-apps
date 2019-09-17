import { getEvent } from '@hisp-amr/api'
import { setCorrespondingEvent } from './helpers'

/**
 * Removes the corresponding event and event type.
 * @param {string} eventId
 * @returns {Promise}
 */
export const removeCorrespondingEvent = async eventId => {
    const event = await getEvent(eventId)
    await setCorrespondingEvent(event, '', '')
}
