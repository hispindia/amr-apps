import React, { Component } from 'react'
import './style.css'
import IconButton from '../../inputs/IconButton'

export class Modal extends Component {
    render() {
        return (
            <div className="modal">
                <div className="close_button">
                    <IconButton
                        name="close"
                        className="close"
                        onClick={() => console.log('clicked')}
                    />
                </div>
                {this.props.children}
            </div>
        )
    }
}
