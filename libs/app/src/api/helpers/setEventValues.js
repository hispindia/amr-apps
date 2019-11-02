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
