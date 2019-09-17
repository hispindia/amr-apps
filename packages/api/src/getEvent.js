import { get } from './crud'

export const getEvent = async eventId => await get(`events/${eventId}`)
