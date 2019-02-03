import React, { Component } from 'react'
import { Button } from '@dhis2/ui/core'
import { RowR } from '../../helpers/helpers'

/**
 * Entity information buttons (Submit/Edit/Delete).
 */
export class EntityButtons extends Component {
    render() {
        return (
            <div style={{ marginTop: 16 }}>
                <RowR>
                    {this.props.buttons.map(button => (
                        <div key={button.label} style={{ paddingLeft: 12 }}>
                            <Button
                                variant="contained"
                                kind={button.kind}
                                onClick={button.onClick}
                                disabled={button.disabled}
                                icon={button.icon}
                            >
                                {button.label}
                            </Button>
                        </div>
                    ))}
                </RowR>
            </div>
        )
    }
}
