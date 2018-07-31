#!/usr/bin/env node

'use strict'

const meow = require('meow')

const main = require('./index')

const cli = meow(`
  Usage
    $ wcjs <dir>
`)

main(cli.input[0])
