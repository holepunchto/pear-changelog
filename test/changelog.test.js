const test = require('brittle')
const { parse, diff } = require('..')

const simpleLog = `
# Changelog

## title
content
`
const newLog = `
# Changelog

A little comment about this release

## 1.3.0 - 17/9/2023
this entry is missing from the older one

## 1.2.0 - 17/9/2023
arbitrary markdown here, like *this*

## 1.1.0 - 6/9/2023
random
### stuff
`

const oldLog = `
# Changelog

A little comment about this release

## 1.2.0 - 17/9/2023
arbitrary markdown here, like *this*

## 1.1.0 - 6/9/2023
random
### stuff
`

const emptyLog = `
# Changelog

A little comment about this release

### this is not a release

##this one neither
`

const bSimple = Buffer.from(simpleLog)
const bNew = Buffer.from(newLog)
const bOld = Buffer.from(oldLog)
const bEmpty = Buffer.from(emptyLog)

test('simple parsing', function (t) {
  t.ok(parse(bSimple)[0][0] === 'title')
})

test('simple difference', function (t) {
  const difference = diff(parse(bNew), parse(bOld))
  t.ok(difference.length === 1)
})

test('empty log', function (t) {
  t.exception(() => { parse(bEmpty) })
})
