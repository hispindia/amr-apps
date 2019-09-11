import { store, reducers } from '@amr/app'
import { categories } from './config'

export const entryStore = store(reducers, { appConfig: { categories } })
