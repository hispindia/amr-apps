import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { alert, appConfig, metadata, selectedOrgUnit, data } from 'reducers'

const middlewares = [ReduxThunk]

const shouldLog = true

if (process.env.NODE_ENV === 'development' && shouldLog) {
    middlewares.push(logger)
}

const rootReducer = combineReducers({
    alert,
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
