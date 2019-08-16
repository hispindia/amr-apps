import { createGlobalStyle } from 'styled-components'
import 'typeface-roboto'

export const BodyStyle = createGlobalStyle`
    body {
        background-color: rgb(240, 240, 240);
    }
    .required span::after {
        color: #c62828;
    }
`
