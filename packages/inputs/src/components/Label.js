import { bool } from 'prop-types'
import styled, { css } from 'styled-components'
import { colors } from '@dhis2/ui-core'

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
}
