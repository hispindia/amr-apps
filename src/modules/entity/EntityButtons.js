import React, { Component } from 'react'
import { Button } from '@dhis2/ui/core'
import { Row } from '../../helpers/helpers'

export class EntityButtons extends Component {
    render() {
        return (
            <div style={{ marginTop: 32 }}>
                <Row>
                    {this.props.buttons.map(button => (
                        <div key={button.label} style={{ paddingRight: 12 }}>
                            <Button
                                variant="contained"
                                kind="primary"
                                onClick={button.onClick}
                                disabled={button.disabled}
                                icon={button.icon}
                            >
                                {button.label}
                            </Button>
                        </div>
                    ))}
                </Row>
            </div>
        )
    }
}
