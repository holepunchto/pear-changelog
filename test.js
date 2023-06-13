const { parse, diff } = require('./index.js')

const p = x => console.log(x)

// p(parse)
const s = `
# changelog
    this is a changelog for our amazing project

## 1.1 - oekokfo
okorkeo
rlfpèerlfpèrl
## 1.0 - 12/06/2023
arbitrary markdown here
### whatever
eokfpoekfpo

## 0.9 - 11/06/2023
arbitrary *markdown* here ###
de e ### 43 4 
`
const b = Buffer.from(s)

const s2 = `
# changelog
    this is a changelog for our amazing project


## 0.9 - 11/06/2023
arbitrary *markdown* here ###
de e ### 43 4 
`

const b2 = Buffer.from(s2)

const arrayOne = parse(b)

const arrayTwo = parse(b2)

p(diff(arrayOne, arrayTwo))
