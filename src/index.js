import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { App } from './App'
import { setBaseUrl } from './api/crud'

const developmentServer = 'https://amrtest.icmr.org.in/amr'
const rootElement = document.getElementById('root')

const withBaseUrl = baseUrl => {
    baseUrl = `${baseUrl}/api`
    setBaseUrl(baseUrl)

    ReactDOM.render(<App />, rootElement)
    serviceWorker.unregister()
}

if (process.env.NODE_ENV === 'production') {
    fetch('./manifest.webapp')
        .then(response => response.json())
        .then(manifest => {
            withBaseUrl(`${manifest.activities.dhis.href}`)
        })
        .catch(e => {
            console.error('Could not read manifest:', e)
            ReactDOM.render(<code>No manifest found</code>, rootElement)
        })
} else withBaseUrl(developmentServer)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
