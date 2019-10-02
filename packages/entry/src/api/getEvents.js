import { getSqlView } from './helpers'

export const getEvents = async (config, orgUnit, username) =>
    await getSqlView(config.sqlViews.table, orgUnit, {
        user: username,
        status: config.param ? config.status : false,
    })
