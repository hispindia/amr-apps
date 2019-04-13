import React from 'react'
import styled from 'styled-components'
import { Card } from '@dhis2/ui/core'
import {
    ButtonRow,
    Heading,
    MarginSmall,
    MarginTopLarge,
    Margin,
    Text,
} from 'helpers'

const Background = styled.div`
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
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
`

const CustomCard = styled(Card)`
    width: 400px !important;
    height: auto !important;
`

export const ModalPopup = props => (
    <Background>
        <CustomCard>
            <Margin>
                <Heading>{props.heading}</Heading>
                <MarginSmall>
                    <Text>{props.text}</Text>
                    <MarginTopLarge>
                        <ButtonRow
                            buttons={[
                                {
                                    label: props.deletion ? 'Cancel' : 'No',
                                    kind: 'basic',
                                    icon: 'clear',
                                    onClick: () => props.onClick(false),
                                },
                                {
                                    label: props.deletion ? 'Delete' : 'Yes',
                                    kind: props.deletion
                                        ? 'destructive'
                                        : 'primary',
                                    icon: props.deletion ? 'delete' : 'done',
                                    onClick: () => props.onClick(true),
                                },
                            ]}
                        />
                    </MarginTopLarge>
                </MarginSmall>
            </Margin>
        </CustomCard>
    </Background>
)
