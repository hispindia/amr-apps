import React from 'react'
import { string } from 'prop-types'
import { App, store } from '@amr/app'
import { appName, categories } from './config'

//import { alert, appConfig, metadata, selectedOrgUnit, data } from 'reducers'

const middlewares = [ReduxThunk]

if (process.env.NODE_ENV === 'development') middlewares.push(logger)

/*const rootReducer = combineReducers({
    alert,
    appConfig,
    metadata,
    selectedOrgUnit,
    data,
})*/

export const IsolateValidation = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={store(categories)}>
        <span>Hello world!</span>
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
