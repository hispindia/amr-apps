import { store, reducers } from '@amr/app'

const isolateReducers = {
    alert: reducers.alert,
    metadata: reducers.metadata,
    data: reducers.data,
}

export const isolateStore = store(isolateReducers)
