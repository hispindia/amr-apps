import { get, request } from '@hisp-amr/api'
import { AMR_ELEMENT } from 'constants/dhis2'

/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitId - Organisation unit ID.
 * @returns {string} AMR Id.
 */
export const generateAmrId = async (orgUnitId, orgUnitCode) => {
    const newId = () =>
        orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)

    let amrId = newId()
    while (
        (await get(
            request('events', {
                fields: 'event',
                filters: `${AMR_ELEMENT}:eq:${amrId}`,
                options: [`orgUnit=${orgUnitId}`],
            })
        )).events.length !== 0
    )
        amrId = newId()

    return amrId
}
