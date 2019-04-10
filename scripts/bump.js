'use strict'

const fs = require('fs')

const paths = [
    'package.json',
    'approval/manifest.json',
    'approval/package.json',
    'capture/manifest.json',
    'capture/package.json'
]

const version = process.argv[2]

paths.forEach(path => {
    const data = JSON.parse(fs.readFileSync(path))
    data.version = version
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
})