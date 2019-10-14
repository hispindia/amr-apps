import React from 'react'
import styled, { css } from 'styled-components'

const StyledSvg = styled.svg`
    fill: white;
    color: white;
    width: 24px;
    height: 24px;
    animation: anim-rotate 1.4s linear infinite;
    circle {
        stroke: currentColor;
        stroke-dasharray: 80px, 200px;
        stroke-dashoffset: 0;
        animation: anim-dash 1.4s ease-in-out infinite;
    }
    @keyframes anim-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes anim-dash {
        0% {
            stroke-dasharray: 1px, 200px;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -15px;
        }
        100% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -120px;
        }
    }
`

export const LoadingIcon = ({ className }) => (
    <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="22 22 44 44"
        className={className}
    >
        <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
    </StyledSvg>
)
