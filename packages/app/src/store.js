import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { alert, appConfig, metadata, selectedOrgUnit, data } from 'reducers'

const middlewares = [ReduxThunk]

if (process.env.NODE_ENV === 'development') middlewares.push(logger)

const rootReducer = combineReducers({
    alert,
    appConfig,
    metadata,
    selectedOrgUnit,
    data,
})

export const store = categories =>
    createStore(
        rootReducer,
        { appConfig: { categories } },
        applyMiddleware(...middlewares)
    )
