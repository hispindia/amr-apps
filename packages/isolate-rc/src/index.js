import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { IsolateTransfer } from './components/IsolateTransfer'

const rootElement = document.getElementById('root')

ReactDOM.render(<IsolateTransfer />, rootElement)

serviceWorker.unregister()
