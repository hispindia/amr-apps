import React from 'react'
import { func, string, bool } from 'prop-types'
import { ButtonRow } from 'components'
import { Text } from 'styles'
import { Background, CustomCard, ModalTitle } from './style'

export const ModalPopup = ({
    heading,
    text,
    onClick,
    label,
    icon,
    primary,
    destructive,
    disabled,
    loading,
}) => (
    <Background>
        <CustomCard>
            <ModalTitle>{heading}</ModalTitle>
            <Text>{text}</Text>
            <ButtonRow
                buttons={[
                    {
                        label: 'Cancel',
                        icon: 'clear',
                        onClick: () => onClick(false),
                        secondary: true,
                        disabled,
                    },
                    {
                        label: label,
                        icon: icon,
                        onClick: () => onClick(true),
                        primary: primary,
                        destructive: destructive,
                        disabled,
                        loading,
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
    disabled: bool,
    loading: bool,
}
