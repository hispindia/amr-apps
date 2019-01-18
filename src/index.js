import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { config, init } from 'd2'
import { setBaseUrl } from './api/crud';


const apiVersion = 29;
const developmentServer = 'http://ugle.asuscomm.com:8888';
const rootElement = document.getElementById('root');

config.i18n.strings.add('app_search_placeholder');
config.i18n.strings.add('manage_my_apps');
config.i18n.strings.add('log_out');
config.i18n.strings.add('account');
config.i18n.strings.add('profile');
config.i18n.strings.add('settings');
config.i18n.strings.add('about_dhis2');
config.i18n.strings.add('help');
config.i18n.strings.add('no_results_found');


const withBaseUrl = baseUrl => {
    baseUrl = `${baseUrl}/api/${apiVersion}`;
    setBaseUrl(baseUrl);

    init({baseUrl: baseUrl})
    .then(d2 => {
        ReactDOM.render(
            <BrowserRouter>
                <App d2={d2} />
            </BrowserRouter>,
            rootElement
        );
        serviceWorker.unregister();
    })
    .catch(err => console.error(err));
};

if (process.env.NODE_ENV === 'production') {
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
    withBaseUrl(developmentServer);
}





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
