import { post } from './crud'

/**
 * Posts event.
 * @param {object} event
 * @returns - Event ID
 */
export const postEvent = async event =>
    (await post('events', event)).response.importSummaries[0].reference
