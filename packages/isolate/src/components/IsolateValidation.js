import React from 'react'
import { string } from 'prop-types'
import { App, MetadataLoader } from '@amr/app'
import { isolateStore } from '../store'
import { appName } from '../config'
import { Main } from './Main'

export const IsolateValidation = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={isolateStore}>
        <MetadataLoader isIsolate>
            <Main />
        </MetadataLoader>
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
