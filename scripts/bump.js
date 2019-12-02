const fs = require('fs')

const paths = [
    'package.json',
    'libs/app/package.json',
    'apps/entry/package.json',
    'apps/isolate/package.json',
    'apps/isolate-nc/package.json',
    'apps/isolate-rc/package.json',
]

const getVersionType = arg => {
    if (!arg) return 2
    switch (arg.toLowerCase()) {
        case 'major':
            return 0
        case 'minor':
            return 1
        default:
            return 2
    }
}

const getCurrentVersion = () => JSON.parse(fs.readFileSync(paths[0])).version

const getNewVersion = (index, current) => {
    const versions = current.split('.')
    versions[index] = parseInt(versions[index]) + 1
    for (i = index + 1; i < versions.length; i++) versions[i] = 0
    return versions.join('.')
}

const setVersion = (path, version) => {
    const data = JSON.parse(fs.readFileSync(path))
    data.version = version
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
}

const main = () => {
    const versionType = getVersionType(process.argv[2])
    const oldVersion = getCurrentVersion()
    const newVersion = getNewVersion(versionType, getCurrentVersion())

    console.log(`${oldVersion} -> ${newVersion}`)

    paths.forEach(path => {
        try {
            setVersion(path, newVersion)
        } catch (error) {
            console.error(`Failed to bump '${path}' to '${newVersion}'`, error)
        }
    })
}

main()
