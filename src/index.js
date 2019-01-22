import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { setBaseUrl } from './api/crud';
import { setAmrProgram } from './api/api';


const developmentServer = 'http://ugle.asuscomm.com:8888';
const rootElement = document.getElementById('root');

const withBaseUrl = async baseUrl => {
    baseUrl = `${baseUrl}/api`;
    setBaseUrl(baseUrl)
    await setAmrProgram()
    var DHIS_CONFIG = {
        baseUrl: baseUrl
    }
    console.log(DHIS_CONFIG.baseUrl)

    ReactDOM.render(<App/>, rootElement);
    serviceWorker.unregister();

    
};


if (process.env.NODE_ENV === 'production') {
    console.log('prod')
    fetch('./manifest.webapp')
        .then(response => response.json())
        .then(manifest => {
            withBaseUrl(`${manifest.activities.dhis.href}`);
        })
        .catch(e => {
            console.error('Could not read manifest:', e);
            ReactDOM.render(<code>No manifest found</code>, rootElement);
        });
} else {
    console.log('dev')
    withBaseUrl(developmentServer);
}





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
