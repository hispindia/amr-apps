import React from 'react'
import { string } from 'prop-types'
import { Row, Title } from 'styles'
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

TitleRow.propTypes = {
    title: string.isRequired,
}
