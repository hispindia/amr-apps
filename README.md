# Apps and libs for the AMR Surveillance System

## Apps
* [Data Entry](./packages/entry)
* [Isolate Transfer](./packages/isolate)
* [RC - Isolate Transfer](./packages/isolate-rc)
* [NC - Isolate Transfer](./packages/isolate-nc)

## Libs
* [@hisp-amr/api](./packages/api) ([npm](https://www.npmjs.com/package/@hisp-amr/api))
* [@hisp-amr/app](./packages/app)
* [@hisp-amr/icons](./packages/icons)
* [@hisp-amr/inputs](./packages/inputs)
* [@hisp-amr/org-unit-tree](./packages/org-unit-tree) ([npm](https://www.npmjs.com/package/@hisp-amr/org-unit-tree))

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
yarn bump patch  # 1.1.1 -> 1.1.2
yarn bump minor  # 1.1.1 -> 1.2.1
yarn bump major  # 1.1.1 -> 2.1.1
```
