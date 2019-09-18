import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { IsolateValidation } from './components/IsolateValidation'

const rootElement = document.getElementById('root')

ReactDOM.render(<IsolateValidation />, rootElement)

serviceWorker.unregister()
