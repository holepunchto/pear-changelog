const test = require('brittle')
const { parse, diff } = require('..')

const simpleLog = `
# Changelog

## title
content
`
const bSimple = Buffer.from(simpleLog)

test('string parsing', function (t) {
  t.is(parse(simpleLog)[0][0], 'title')
})

test('simple parsing', function (t) {
  const parsed = parse(bSimple)[0]
  t.is(parsed[0], 'title')
  t.is(parsed[1], '## title\ncontent')
})

test('simple difference', function (t) {
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
  const bNew = Buffer.from(newLog)
  const bOld = Buffer.from(oldLog)
  const difference = diff(parse(bNew), parse(bOld))
  t.is(difference.length, 1)
})

test('empty log', function (t) {
  const emptyLog = `
# Changelog

A little comment about this release

### this is not a release

##this one neither
`
  const bEmpty = Buffer.from(emptyLog)
  const emptyArray = parse(bEmpty)
  const expectedResult = []
  t.alike(emptyArray, expectedResult)
})

test('wrong type', function (t) {
  const wrongArg = 777
  const emptyArray = parse(wrongArg)
  const expectedResult = []
  t.alike(emptyArray, expectedResult)
})

test('win string', function (t) {
  const winLog = '\r\n# Changelog\r\n\r\n## title\r\ncontent\r\n'
  t.is(parse(winLog)[0][0], 'title')
})
