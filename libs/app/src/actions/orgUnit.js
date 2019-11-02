import { createAction } from './createAction'
import { ORG_UNIT_SELECTED } from './types'

export const setOrgUnit = orgUnit => dispatch =>
    dispatch(createAction(ORG_UNIT_SELECTED, orgUnit))
