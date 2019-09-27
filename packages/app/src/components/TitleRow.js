import React from 'react'
import { string, object, node } from 'prop-types'
import styled from 'styled-components'
import { Title } from 'styles'
import { IconButton } from 'components'

const Row = styled.div`
    display: flex;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const TitleRow = ({ title, history, button }) => (
    <Wrapper>
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
        {button}
    </Wrapper>
)

TitleRow.propTypes = {
    title: string.isRequired,
    history: object,
    button: node,
}
