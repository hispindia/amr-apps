import { get, request } from '@hisp-amr/api'
import { AMR_ISOLATE_APP_AMRID } from '../constants/sqlViews'

export const getEvents = async ({ program, orgUnit, from, to }) =>
    await get(
        request(`sqlViews/${AMR_ISOLATE_APP_AMRID}/data`, {
            options: [
                `var=program:${program}`,
                `var=orgUid:${orgUnit}`,
                `var=startdate:${from}`,
                `var=enddate:${to}`,
            ],
        })
    )

//var=program:rMiBliR4FGr&var=orgUid:KVGVwpR3o0H&var=startdate:2019-01-06&var=enddate:2019-09-19
