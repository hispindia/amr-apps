import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { DataEntry } from './components/DataEntry'

const rootElement = document.getElementById('root')

ReactDOM.render(<DataEntry />, rootElement)

serviceWorker.unregister()
