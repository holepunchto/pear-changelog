# pear-changelog

Changelog parsing and diffing

## Format

The format of the changelog is fairly simple

```markdown
arbitrary mardown here as a header

## release title

arbitrary markdown here

## release title

arbitrary markdown here
```

There is a header of unspecified shape, and various release entries, that use the format

```markdown
## title

content
```

## Usage

The module contains a couple of functions:

```javascript
const { parse, diff } = require('pear-changelog')
```

the `parse` function returns an array of releases.
Each release is another array, with index 0 being the title of the release, and index 1 being the entire body of the release (in markdown, including the title).
If it receives anything other than a string or a buffer with the correct format, it will return an empty array.

the `diff` function compares two arrays of releases, and return a new array with the releases that are in the first array but not in the second one.

```javascript
const log1 = `
# Changelog

## newer entry
content

## older entry
content
`

const log2 = `
# Changelog

## older entry
content
`
const bLog1 = Buffer.from(log1)

const bLog2 = Buffer.from(log2)

const pLog1 = parse(bLog1)

const pLog2 = parse(bLog2)

console.log(pLog2)

// this prints [ [ 'older entry', '\n## older entry\ncontent\n' ] ]

const difference = diff(pLog1, pLog2)

console.log(difference)

// this prints [ [ 'newer entry', '\n## newer entry\ncontent\n' ] ]
```

## License

Apache 2.0
