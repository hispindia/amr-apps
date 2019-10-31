import fs from 'fs'

export const writeToFile = obj =>
    fs.writeFileSync('./data.json', JSON.stringify(obj, null, 4), 'utf-8')
