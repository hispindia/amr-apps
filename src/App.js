import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
//import logo from './logo.svg';
import { HashRouter } from 'react-router-dom'
import { Main } from './Main'
import { Header } from './modules/Header'

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <HashRouter>
                    <div>
                        <Header />
                        <Main />
                    </div>
                </HashRouter>
            </BrowserRouter>
        )
    }
}
