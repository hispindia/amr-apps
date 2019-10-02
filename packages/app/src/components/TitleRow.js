import React from 'react'
import { string, object, node } from 'prop-types'
import styled from 'styled-components'
import { IconButton } from 'components'

const Title = styled.h1`
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: 500;
`

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
