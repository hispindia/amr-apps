import { get, request } from '@hisp-amr/api'
import { GET_AMR_IDS } from 'constants/sqlViews'

const getAmrIds = async orgUnit =>
    (await get(
        request(`sqlViews/${GET_AMR_IDS}/data`, {
            options: [`var=orgunit:${orgUnit}`],
        })
    )).listGrid.rows.map(row => row[0])

/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitId - Organisation unit ID.
 * @returns {string} AMR Id.
 */
export const generateAmrId = async (orgUnitId, orgUnitCode) => {
    const newId = () =>
        `${orgUnitCode}${Math.floor(Math.random() * 90000) + 10000}`

    const amrIds = await getAmrIds(orgUnitId)

    let amrId = newId()
    while (amrIds.includes(amrId)) amrId = newId()

    return amrId
}
