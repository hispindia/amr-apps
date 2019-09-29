import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { ButtonRow } from '@hisp-amr/app'

export class PrintButtons extends Component {
    render() {
        return (
            <ButtonRow
                buttons={[
                    {
                        label: 'Cancel',
                        onClick: this.props.onCancel,
                        icon: 'clear',
                        secondary: true,
                        tooltip: 'Cancel',
                    },
                    {
                        label: 'Print',
                        onClick: () => {
                            this.props.onClick()
                            this.props.onCancel()
                        },
                        icon: 'print',
                        primary: true,
                        tooltip: 'Print',
                        disabled: this.props.disabled,
                    },
                ]}
            />
        )
    }
}

PrintButtons.propTypes = {
    onCancel: func.isRequired,
    onClick: func,
    disabled: bool,
}
