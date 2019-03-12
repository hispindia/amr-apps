# AMR Record Approval and Capture

### TODO
- [ ] Automatic possible duplation check
- [ ] Manual duplication confirmation
- [ ] Deleting records which do have an approval status
- [ ] Editing person values
- [ ] Using local storage for versioned meta data
- [ ] Numbers only text fields
- [ ] Susceptibility colors based on result
- [ ] Modals

### Installation

```
cd [root_dir]
yarn install
cd [root_dir]/approval
yarn install
cd [root_dir]/capture
yarn install
```

### Development

You need to log in to the test server:
`http://apps.hispindia.org/amr/`

```
cd [root_dir]
yarn start
cd [root_dir]/approval
yarn start
cd [root_dir]/capture
yarn start
```

### Building

```
cd [root_dir]
yarn build:approval
yarn build:capture
```
