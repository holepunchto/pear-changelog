const b4a = require('b4a')

function parse (b) {
  const stringedSource = b4a.toString(b) // turn the buffer into a string

  if (stringedSource.indexOf('\n## ') < 0) throw Error('No releases or header found')

  const noHeader = stringedSource.slice(stringedSource.indexOf('\n## ')) // removes the header of the changelog

  const releasesAsStrings = noHeader.split(/(?=\n## )/) // splits changelog into an array of strings, one per release

  const releasesAsObjects = releasesAsStrings.map(x => [x.trim().split('\n')[0].substring(x.indexOf('##') + 2).trim(), x]) // stores each string into an object with an id field

  return releasesAsObjects
}

function diff (newLog, oldLog) {
  const oldMap = new Map(oldLog)
  const results = newLog.filter(x => !oldMap.has(x[0]))
  return results
}

module.exports = { parse, diff }
