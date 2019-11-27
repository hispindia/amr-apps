import { getSqlView } from './helpers'

export const getCounts = async (configs, orgUnit, username) => {
    for (const config of configs)
        config.count = (await getSqlView(config.sqlViews.count, orgUnit, {
            user: username,
            status: config.param ? config.status : false,
        }))[0][0]
    return configs.map(config => config.count)
}
