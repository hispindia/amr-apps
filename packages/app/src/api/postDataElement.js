import { post } from './crud'

export const postDataElement = async dataElement =>
    await post('dataElements', dataElement)
