import React from 'react'
import { Row, Title } from 'helpers'
import { IconButton } from 'inputs'

export const TitleRow = props => (
    <Row>
        {props.history && (
            <IconButton
                name="arrow_back"
                icon="arrow_back"
                onClick={props.history.goBack}
            />
        )}
        <Title>{props.title}</Title>
    </Row>
)
