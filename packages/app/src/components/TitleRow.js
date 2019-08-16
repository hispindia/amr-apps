import React from 'react'
import { string } from 'prop-types'
import { Row, Title } from 'styles'
import { IconButton } from 'components'

export const TitleRow = ({ title, history }) => (
    <Row>
        {history && (
            <IconButton
                tooltip="Go back"
                icon="arrow_back"
                onClick={history.goBack}
            />
        )}
        <Title>{title}</Title>
    </Row>
)

TitleRow.propTypes = {
    title: string.isRequired,
}
