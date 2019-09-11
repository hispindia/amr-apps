import { getEvent } from '@amr/app'
import { setCorrespondingIsolate } from './setCorrespondingIsolate'

export const removeCorrespondingIsolate = async eventId => {
    const event = await getEvent(eventId)
    await setCorrespondingIsolate(event, '')
}
