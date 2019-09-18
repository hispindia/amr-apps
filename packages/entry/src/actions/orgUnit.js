import { createAction } from '@hisp-amr/app'
import { ORG_UNIT_SELECTED } from './types'

export const setOrgUnit = (id, path) => dispatch =>
    dispatch(createAction(ORG_UNIT_SELECTED, { id, path }))
