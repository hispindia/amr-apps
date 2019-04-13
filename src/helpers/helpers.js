import styled, { css } from 'styled-components'

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
    margin: 40px 0 30px 8px;
    color: #0d0d0e;
    font-size: 1.25rem;
    line-height: 1.6;
    font-weight: 500;
`

export const Text = styled.div`
    margin: 12px 0;
    line-height: 24px;
`

export const Label = styled.div`
    color: var(--grey700);
    white-space: nowrap;
    padding: 0px 12px 12px 12px;
    line-height: 24px;
    font-weight: 500;
    ${props =>
        props.required &&
        !props.disabled &&
        css`
            ::after {
                content: '*';
                color: var(--red600);
                padding-left: 4px;
            }
        `
    }
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`

export const Col = styled.div`
    display: flex;
    flex-direction: column;
`

export const RowW = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const RowR = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

export const ColW = styled.div`
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
`
export const Input = styled.div`
    min-width: 300px;
    .ui_selectfield_label_1a3v8.ui_selectfield_required_1a3v8::after,
    .ui_inputfield_label_kvrmz.ui_inputfield_required_kvrmz::after {
        color: var(--red600);
        padding-left: 4px;
    }
`

export const OptionSpacer = styled.div`
    margin-right: 40px;
`

export const Margin = styled.div`
    margin: 16px;
`

export const MarginSides = styled.div`
    margin-left: 16px;
    margin-right: 16px;
`

export const MarginSidesSmall = styled.div`
    margin-left: 8px;
    margin-right: 8px;
`

export const MarginTop = styled.div`
    margin-top: 16px;
`

export const MarginBottom = styled.div`
    margin-bottom: 16px;
`

export const MarginSmall = styled.div`
    margin: 8px;
`

export const MarginTopSmall = styled.div`
    margin-top: 8px;
`

export const MarginTopLarge = styled.div`
    margin-top: 24px;
`

export const Padding = styled.div`
    padding: 16px;
`
