import React from 'react'
import { func, string, bool } from 'prop-types'
import { ButtonRow } from 'inputs'
import { Text } from 'styles'
import { Background, CustomCard, CustomHeading } from './style'

export const ModalPopup = ({
    heading,
    text,
    onClick,
    label,
    icon,
    primary,
    destructive,
}) => (
    <Background>
        <CustomCard>
            <CustomHeading>{heading}</CustomHeading>
            <Text>{text}</Text>
            <ButtonRow
                unspaced
                buttons={[
                    {
                        label: 'Cancel',
                        icon: 'clear',
                        onClick: () => onClick(false),
                        secondary: true,
                    },
                    {
                        label: label,
                        icon: icon,
                        onClick: () => onClick(true),
                        primary: primary,
                        destructive: destructive,
                    },
                ]}
            />
        </CustomCard>
    </Background>
)

ModalPopup.propTypes = {
    heading: string.isRequired,
    onClick: func.isRequired,
    label: string.isRequired,
    icon: string.isRequired,
    primary: bool,
    destructive: bool,
}
