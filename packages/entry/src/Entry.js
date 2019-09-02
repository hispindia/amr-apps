import React from 'react'
import { string } from 'prop-types'
import { App, Content, store } from '@amr/app'
import { appName, categories } from './config'

export const Entry = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={store(categories)}>
        <Content />
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
