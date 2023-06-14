'use strict'

const b4a = require('b4a')

function parse (b) {
  const stringedSource = typeof b === 'string' ? b : b4a.toString(b) // turn the buffer into a string

  const firstReleaseIndex = stringedSource.indexOf('\n## ')

  if (firstReleaseIndex < 0) throw new Error('No releases or header found')

  const noHeader = stringedSource.slice(firstReleaseIndex) // removes the header of the changelog

  const releasesAsStrings = noHeader.split(/(?=\n## )/) // splits changelog into an array of strings, one per release

  const releasesAsObjects = releasesAsStrings.map(parseRelease)

  return releasesAsObjects
}

function diff (newLog, oldLog) {
  const oldMap = new Map(oldLog)
  const results = newLog.filter(x => !oldMap.has(x[0]))
  return results
}

function parseRelease (x) {
  const clean = x.slice(x.indexOf('##')).trim()
  const nl = clean.indexOf('\n')
  const id = clean.slice(2, nl < 0 ? clean.length : nl).trim()
  return [id, clean]
}

module.exports = { parse, diff }
