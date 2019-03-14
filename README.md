# AMR Approval and Capture

### TODO
- [ ] Automatic possible duplation check
- [ ] Manual duplication confirmation
- [x] Deleting records
- [x] Editing person values
- [ ] Using local storage for versioned meta data
- [x] Numbers only text fields
- [ ] Susceptibility colors based on result
- [ ] Modals
- [ ] Hashing patient registration number
- [x] Deselectable radio buttons
- [x] Disabling field after ASSIGN rule action
- [ ] Storing incomplete records

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
yarn build
```
