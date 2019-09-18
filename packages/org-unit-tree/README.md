# org-unit-tree

## Installation

```bash
yarn add @hisp-amr/org-unit-tree
# or
npm i @hisp-amr/org-unit-tree
```

## Usage
`REACT_APP_DHIS2_BASE_URL` needs to be set.

```bash
# [root_dir]/.env.development
REACT_APP_DHIS2_BASE_URL=https://amrtest.icmr.org.in/amr
```

```bash
# [root_dir]/.env.production
REACT_APP_DHIS2_BASE_URL=../../..
```

```jsx
import React from 'react'
import { OrgUnitTree } from '@hisp-amr/org-unit-tree'

const onError = error => console.error(error)
const onSelect = selected => console.log(selected)

const App = () => (
    <>
        {/* Other components */}
        <OrgUnitTree
            onSelect={onSelect}
            onError={onError}
        />
    </>
)
```