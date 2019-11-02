import { store, reducers } from '@hisp-amr/app'

const isolateReducers = {
    alert: reducers.alert,
    metadata: reducers.metadata,
    data: reducers.data,
}

export const isolateStore = store(isolateReducers)
