'use strict'

const b4a = require('b4a')

function parse(b) {
  let stringedSource = null

  if (typeof b === 'string') {
    stringedSource = b
  } else if (Buffer.isBuffer(b)) {
    stringedSource = b4a.toString(b)
  } else {
    return []
  }

  const firstReleaseIndex = stringedSource.indexOf('\n## ')

  if (firstReleaseIndex < 0) return []

  const noHeader = stringedSource.slice(firstReleaseIndex) // removes the header of the changelog

  const releasesAsStrings = noHeader.split(/(?=\n## )/) // splits changelog into an array of strings, one per release

  const releasesAsObjects = releasesAsStrings.map(parseRelease)

  return releasesAsObjects
}

function diff(newLog, oldLog) {
  const oldMap = new Map(oldLog)
  const results = newLog.filter((x) => !oldMap.has(x[0]))
  return results
}

function parseRelease(x) {
  const clean = x.slice(x.indexOf('##')).trim()
  const nl = clean.indexOf('\n')
  const id = clean.slice(2, nl < 0 ? clean.length : nl).trim()
  return [id, clean]
}

module.exports = { parse, diff }
