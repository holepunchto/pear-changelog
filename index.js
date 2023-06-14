'use strict'

const b4a = require('b4a')

function parse (b) {
  const stringedSource = typeof b === 'string' ? b : b4a.toString(b) // turn the buffer into a string

  const firstReleaseIndex = stringedSource.indexOf('\n## ')

  if (firstReleaseIndex < 0) throw new Error('No releases or header found')

  const noHeader = stringedSource.slice(firstReleaseIndex) // removes the header of the changelog

  const releasesAsStrings = noHeader.split(/(?=\n## )/) // splits changelog into an array of strings, one per release

  const releasesAsObjects = releasesAsStrings.map(x => [x.trim().split('\n')[0].slice(x.indexOf('##') + 2).trim(), x.slice(x.indexOf('##')).trim()]) // stores each string into an object with an id field

  return releasesAsObjects
}

function diff (newLog, oldLog) {
  const oldMap = new Map(oldLog)
  const results = newLog.filter(x => !oldMap.has(x[0]))
  return results
}

module.exports = { parse, diff }
