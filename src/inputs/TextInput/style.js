import styled, { css } from 'styled-components'

/**
 * Colored field background.
 */
export const CustomInputField = styled.div`
    ${props => {
        switch (props.color) {
            case 'red':
                return css`
                    .content {
                        background-color: rgba(255, 0, 0, 0.082) !important;
                    }
                `
            case 'yellow':
                return css`
                    .content {
                        background-color: rgba(255, 255, 0, 0.082) !important;
                    }
                `
            case 'green':
                return css`
                    .content {
                        background-color: rgba(0, 255, 0, 0.082) !important;
                    }
                `
            default:
                return null
        }
    }}
`
