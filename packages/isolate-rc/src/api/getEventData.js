import { get, request } from '@hisp-amr/api'
import { AMR_ISOLATE_APP_EDV } from '../constants/sqlViews'

export const getEventData = async eventId =>
    await get(
        request(`sqlViews/${AMR_ISOLATE_APP_EDV}/data`, {
            options: [`var=eventID:${eventId}`],
        })
    )
