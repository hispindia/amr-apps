const { exec } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

function install_app(app, build) {
    exec('yarn install', { cwd: app }, async function(error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`)
            process.exit(1)
        }

        console.log(`stdout: ${stdout}`)

        if (stderr) {
            console.log(`stderr: ${stderr}`)
        }

        build_app(app, build)
    })
}

function build_app(app, build) {
    exec('yarn build', { cwd: app }, async function(error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`)
            process.exit(1)
        }

        console.log(`stdout: ${stdout}`)

        if (stderr) {
            console.log(`stderr: ${stderr}`)
        }

        fs.copy(path.join(app, 'build'), build)
    })
}

function main() {
    const root = process.cwd()
    const app = path.join(root, 'entry')
    const build = path.join(root, 'build', 'entry')

    install_app(app, build)
}

main()
