import { store, reducers } from '@hisp-amr/app'
import { categories } from './config'

export const entryStore = store(reducers, { appConfig: { categories } })
