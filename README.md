# AMR Data Entry and Approval

### TODO
- [x] Warning/error program rule action
- [x] Automatic duplication check
- [x] DD not have color when MIC has value
- [x] Hashing patient registration number
- [ ] Special characters in test values

### Installation
```
cd [root_dir]
yarn install
cd [root_dir]/approval
yarn install
cd [root_dir]/entry
yarn install
```

### Development
You need to log in to the test server:
`https://amrtest.icmr.org.in/amrtest`

```
cd [root_dir]
yarn start
cd [root_dir]/approval
yarn start
cd [root_dir]/entry
yarn start
```

### Building
```
cd [root_dir]
yarn build
```

### Versioning
```
cd [root_dir]
yarn bump x.x.x
```