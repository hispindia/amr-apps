import { bool } from 'prop-types'
import styled, { css } from 'styled-components'
import { colors } from '@dhis2/ui-core'

export const Title = styled.h1`
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: 500;
`

export const Heading = styled.h2`
    color: #0d0d0e;
    font-size: 1.25rem;
    margin-block-start: 1.6rem;
    margin-block-end: 1rem;
    margin-inline-start: 1rem;
    font-weight: 500;
`

export const Text = styled.div`
    margin: 8px 0;
    line-height: 24px;
`

export const Label = styled.div`
    color: ${colors.grey600};
    white-space: nowrap;
    padding-bottom: 12px;
    line-height: 24px;
    font-weight: 500;
    ${({ required }) =>
        required &&
        css`
            ::after {
                content: '*';
                padding-left: 4px;
            }
        `}
`

Label.propTypes = {
    required: bool,
    disabled: bool,
}
