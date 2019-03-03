import React from 'react'
import { Row, Title } from '../../helpers/helpers'
import IconButton from '../../inputs/IconButton'

export const TitleRow = props => (
    <Row>
        {props.backPath && (
            <IconButton
                name="arrow_back"
                icon="arrow_back"
                onClick={() => props.history.push(props.backPath)}
            />
        )}
        <Title>{props.title}</Title>
    </Row>
)
