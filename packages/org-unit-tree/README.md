# org-unit-tree

## Installation

```bash
yarn add @hisp-amr/org-unit-tree
# or
npm i @hisp-amr/org-unit-tree
```

## Environment variables
`REACT_APP_DHIS2_BASE_URL` and `REACT_APP_DHIS2_API_VERSION` needs to be set.

### Example
```dotenv
# [root_dir]/.env
REACT_APP_DHIS2_API_VERSION=30
```

```dotenv
# [root_dir]/.env.development
REACT_APP_DHIS2_BASE_URL=https://amrtest.icmr.org.in/amr
```

```dotenv
# [root_dir]/.env.production
REACT_APP_DHIS2_BASE_URL=../../..
```

## Usage
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
            onError{onError}
        />
    </>
)
```