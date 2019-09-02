import React from 'react'
import ReactDOM from 'react-dom'
import { init } from '@amr/app'
import * as serviceWorker from './serviceWorker'
import { DataEntry } from './DataEntry'

const developmentServer = 'https://amrtest.icmr.org.in/amr'
const rootElement = document.getElementById('root')

const productionRender = async () => {
    try {
        const manifest = await (await fetch('./manifest.webapp')).json()
        render(manifest.activities.dhis.href)
    } catch (error) {
        console.error('Could not read manifest:', error)
        ReactDOM.render(<code>No manifest found</code>, rootElement)
    }
}

const render = baseUrl => {
    init(`${baseUrl}/api`)
    ReactDOM.render(<DataEntry baseUrl={baseUrl} />, rootElement)
    serviceWorker.unregister()
}

if (process.env.NODE_ENV === 'production') productionRender()
else render(developmentServer)
