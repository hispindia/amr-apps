import {
    BATCH_NUMBER_ELEMENT,
    DISPATCH_DATE_ELEMENT,
    DISPATCH_STATUS_ELEMENT,
    RECEIVED_DATE_ELEMENT,
} from '../../constants/dataElements'

const findValue = (dataValues, id) =>
    dataValues.find(ev => ev.dataElement === id)

export const setValues = (
    event,
    { batchId, received, dispatched, dispatchStatus }
) => {
    const newValues = [
        {
            dataElement: BATCH_NUMBER_ELEMENT,
            value: batchId,
        },
        {
            dataElement: DISPATCH_DATE_ELEMENT,
            value: dispatched,
        },
        {
            dataElement: DISPATCH_STATUS_ELEMENT,
            value: dispatchStatus,
        },
        {
            dataElement: RECEIVED_DATE_ELEMENT,
            value: received,
        },
    ]

    newValues.forEach(newValue => {
        let dataValue = findValue(event.dataValues, newValue.dataElement)

        if (!dataValue) {
            event.dataValues.push(newValue)
            event.updateNeeded = true
        } else if (dataValue.value !== newValue.value) {
            dataValue = newValue
            event.updateNeeded = true
        }
    })

    return event
}
