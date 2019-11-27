import {
    CORRESPONDING_EVENT_ELEMENT,
    EVENT_TYPE_ELEMENT,
} from '../../constants/dhis2'

/**
 * Assigns the corresponding event and event type values.
 * @param {Object[]} dataValues
 * @param {string} correspondingEvent
 * @param {string} eventType
 * @returns {Object[]}
 */
export const assignDataValues = (dataValues, correspondingEvent, eventType) => [
    ...dataValues.filter(
        ({ dataElement }) =>
            ![CORRESPONDING_EVENT_ELEMENT, EVENT_TYPE_ELEMENT].includes(
                dataElement
            )
    ),
    { dataElement: CORRESPONDING_EVENT_ELEMENT, value: correspondingEvent },
    { dataElement: EVENT_TYPE_ELEMENT, value: eventType },
]
