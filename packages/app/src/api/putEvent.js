import { put } from './crud'

export const putEvent = async event => await put(`events/${event.event}`, event)
