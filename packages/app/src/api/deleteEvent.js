import { del } from './crud'

export const deleteEvent = async eventId => await del(`events/${eventId}`)
