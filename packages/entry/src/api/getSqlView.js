import { get, request } from '@hisp-amr/api'

export const getSqlView = async (sqlView, orgUnit, { user, status }) =>
    (await get(
        request(`sqlViews/${sqlView}/data`, {
            options: [
                `var=orgunit:${orgUnit}`,
                `var=username:${user}`,
                ...(status ? [`var=status:${status}`] : []),
            ],
        })
    )).listGrid.rows
