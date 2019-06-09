import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { appConfig, metadata, selectedOrgUnit, data } from './reducers'

const middlewares = [ReduxThunk]

const shouldLog = false

if (process.env.NODE_ENV === 'development' && shouldLog) {
    middlewares.push(logger)
}

const rootReducer = combineReducers({
    appConfig,
    metadata,
    selectedOrgUnit,
    data,
})

export const store = (categories, isApproval = false) =>
    createStore(
        rootReducer,
        { appConfig: { categories, isApproval } },
        applyMiddleware(...middlewares)
    )
