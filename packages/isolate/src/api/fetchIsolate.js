import {
    getRecord,
    getEvent,
    ACTIVE,
    COMPLETED,
    postEvent,
    putEvent,
    deleteEvent,
    updateEventValue,
    postDataElement,
} from '@amr/app'
import {
    CORRESPONDING_ISOLATE_ELEMENT,
    CORRESPONDING_EVENT_ELEMENT,
} from '../constants/dhis2'

const isolateDe = {
    lastUpdated: '2019-09-05T13:54:00.546',
    id: 'zXHKQkUKqzY',
    href: 'https://amrtest.icmr.org.in/amr/api/dataElements/zXHKQkUKqzY',
    created: '2019-09-05T13:54:00.546',
    name: 'Corresponding isolate',
    shortName: 'Corresponding isolate',
    aggregationType: 'NONE',
    domainType: 'TRACKER',
    displayName: 'Corresponding isolate',
    publicAccess: 'rw------',
    description: 'Contains the event ID of the isolate',
    displayShortName: 'Corresponding isolate',
    externalAccess: false,
    valueType: 'TEXT',
    displayDescription: 'Contains the event ID of the isolate',
    dimensionItem: 'zXHKQkUKqzY',
    displayFormName: 'Corresponding isolate',
    zeroIsSignificant: false,
    favorite: false,
    optionSetValue: false,
    dimensionItemType: 'DATA_ELEMENT',
    access: {
        read: true,
        update: true,
        externalize: true,
        delete: true,
        write: true,
        manage: true,
    },
    categoryCombo: {
        id: 'bjDvmb4bfuf',
    },
    lastUpdatedBy: {
        id: 'aWnm8btrL9A',
    },
    user: {
        id: 'aWnm8btrL9A',
    },
    favorites: [],
    dataSetElements: [],
    translations: [],
    userGroupAccesses: [],
    dataElementGroups: [],
    attributeValues: [],
    userAccesses: [],
    legendSets: [],
    aggregationLevels: [],
}

const setCorrespondingIsolate = async (event, isolate) =>
    await putEvent({
        ...event,
        status: COMPLETED,
        dataValues: [
            ...event.dataValues,
            {
                dataElement: CORRESPONDING_ISOLATE_ELEMENT,
                value: isolate,
            },
        ],
    })

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
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: event.event,
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

/**
 * If the supplied event has an isolate it gets the isolate record.
 * Otherwise, it creates the an isolate record.
 * @param {objecy} programs
 * @param {string} eventId
 * @returns {object} - Isolate record
 */
export const fetchIsolate = async (programs, eventId) => {
    const event = await getEvent(eventId)
    console.log(event)

    const correspondingIsolate = event.dataValues.find(
        dv => dv.dataElement === CORRESPONDING_ISOLATE_ELEMENT
    )

    // Existing isolate
    if (correspondingIsolate) {
        console.log('existing isolate')
        return await getRecord(programs, correspondingIsolate.value, true)
    }

    // Is isolate
    if (
        event.dataValues.find(
            dv => dv.dataElement === CORRESPONDING_EVENT_ELEMENT
        )
    ) {
        console.log('is isolate')
        return await getRecord(programs, eventId, true)
    }

    // Create isolate
    console.log('creating isolate')
    const isolateId = await postIsolate(event)
    setCorrespondingIsolate(event, isolateId)
    return await getRecord(programs, isolateId, true)
}
