import styled from 'styled-components'
import { Card } from '@dhis2/ui-core'

export const Background = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: baseline;
    z-index: 1;
    padding-top: 62px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(33, 43, 54, 0.4);
`

export const ModalTitle = styled.h1`
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
`

export const CustomCard = styled(Card)`
    width: 400px !important;
    height: auto !important;
    padding: 24px;
`
