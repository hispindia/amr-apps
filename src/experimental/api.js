import moment from 'moment'
import { removeTime } from '../helpers'

export const _duplicateStatusDataElement = 'L6ZyBJGOeAV'
const _sampleDateElementId = 'JRUa0qYKQDF'

export async function getDuplicates(
    entityId,
    eventDate,
    days,
    organism,
    dataElements
) {
    let events = (await get(
        'events.json?paging=false&fields=event,orgUnit,' +
            'eventDate,status,dataValues[dataElement,value]&trackedEntityInstance=' +
            entityId +
            '&filter=' +
            _organismsDataElementId +
            ':eq:' +
            organism
    )).events

    eventDate = moment(eventDate)

    events = events.filter(
        e =>
            e.status === 'COMPLETED' &&
            eventDate.diff(moment(e.eventDate), 'days') > -days &&
            eventDate.diff(moment(e.eventDate), 'days') < days
    )

    let headers = [
        {
            id: 'Sample Date',
            name: 'Sample Date',
        },
    ]

    events.forEach(e => {
        e.dataValues.forEach(d => {
            if (!headers.find(h => h.id === d.dataElement))
                headers.push({
                    id: d.dataElement,
                    name: dataElements[d.dataElement],
                    options: { display: headers.length < 5 },
                })
        })
    })

    headers.push({
        name: 'Organisation unit ID',
        options: { display: false },
    })

    headers.push({
        name: 'Event ID',
        options: { display: false },
    })

    let rows = []

    events.forEach(e => {
        let row = [removeTime(e.eventDate)]
        headers.forEach((h, i) => {
            if ([0, headers.length - 1, headers.length - 2].includes(i)) return
            const dataValue = e.dataValues.find(d => d.dataElement === h.id)
            row.push(dataValue ? dataValue.value : '')
        })
        row.push(e.orgUnit)
        row.push(e.event)
        rows.push(row)
    })

    return { headers, rows }
}

export async function possibleDuplicate(
    entityId,
    eventId,
    eventDate,
    days,
    organism
) {
    const events = (await get(
        'events.json?paging=false&fields=eventDate,event,' +
            'status&trackedEntityInstance=' +
            entityId +
            '&filter=' +
            _organismsDataElementId +
            ':eq:' +
            organism
    )).events

    eventDate = moment(eventDate)

    if (
        events.find(
            e =>
                e.event !== eventId &&
                e.status === 'COMPLETED' &&
                eventDate.diff(moment(e.eventDate), 'days') > -days &&
                eventDate.diff(moment(e.eventDate), 'days') < days
        )
    )
        await updateEventValue(eventId, _duplicateStatusDataElement, 'Possible')
}
