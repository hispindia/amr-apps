import { createGlobalStyle } from 'styled-components'
import 'typeface-roboto'

export const BodyStyle = createGlobalStyle`
    body {
        background-color: rgb(240, 240, 240);
        min-width: 400px;
        overflow-y: auto !important;
        padding-right: 0 !important;
    }
    .no-hover tr {
            user-select: unset !important;
            cursor: unset !important;
    }
`
