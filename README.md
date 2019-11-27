# Apps and libs for the AMR Surveillance System

## Apps

-   [Data Entry](./apps/entry)
-   [Isolate Transfer](./apps/isolate)
-   [RC - Isolate Transfer](./apps/isolate-rc)
-   [NC - Isolate Transfer](./apps/isolate-nc)

## Libs

-   [@hisp-amr/api](./libs/api) ([npm](https://www.npmjs.com/package/@hisp-amr/api))
-   [@hisp-amr/app](./libs/app)
-   [@hisp-amr/icons](./libs/icons)
-   [@hisp-amr/inputs](./libs/inputs)
-   [@hisp-amr/org-unit-tree](./libs/org-unit-tree) ([npm](https://www.npmjs.com/package/@hisp-amr/org-unit-tree))
-   [@hisp-amr/rule-engine](./libs/rule-engine)

## Installation

```bash
yarn install
```

## Development

You need to log in to the test server: https://amrtest.icmr.org.in/amr

```bash
yarn start
```

You may have to F5 once.

## Building

```bash
yarn build
```

## Versioning

```bash
yarn bump        # 1.1.1 -> 1.1.2
yarn bump minor  # 1.1.1 -> 1.2.0
yarn bump major  # 1.1.1 -> 2.0.0
```
