import { COMPLETED, putEvent } from '@amr/app'
import { CORRESPONDING_ISOLATE_ELEMENT } from '../constants/dhis2'

export const setCorrespondingIsolate = async (event, isolate) =>
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
