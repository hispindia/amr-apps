import React from 'react'
import { Row, Title } from '../../helpers/helpers'
import IconButton from '../../inputs/IconButton'

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
