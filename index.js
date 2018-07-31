'use strict'

const path = require('path')

const globby = require('globby')
const execa = require('execa')
const Table = require('cli-table')

const main = async (dir = '.') => {
  const pattern = path.join(dir, '**/*.js')
  const paths = await globby(pattern, { gitignore: true })

  let total = 0
  let max = 0
  let above = 0

  for (const p of paths) {
    const result = await execa('wc', ['-l', path.resolve(p)])
    const numberOfLines = Number(result.stdout.trim().split(' ')[0])

    total += numberOfLines

    if (numberOfLines > max) {
      max = numberOfLines
    }

    if (numberOfLines > 200) {
      above++
    }
  }

  const table = new Table()
  table.push(
    { 'Total JavaScript files': paths.length },
    { 'Avg number of lines': Math.round(total / paths.length) },
    { 'Max number of lines': max },
    { 'Files with more than 200 lines': above }
  )

  console.log(table.toString())
}

module.exports = main
