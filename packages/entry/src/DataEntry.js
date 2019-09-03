import React from 'react'
import { string } from 'prop-types'
import { App, Content, store, reducers } from '@amr/app'
import { appName, categories } from './config'

const appStore = store(reducers, { appConfig: { categories } })

export const DataEntry = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={appStore}>
        <Content />
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
