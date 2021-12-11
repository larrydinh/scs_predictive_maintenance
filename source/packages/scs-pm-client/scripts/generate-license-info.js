#!/usr/bin/env node
/* eslint-disable */

const licenseChecker = require('npm-license-tracker/src')

const path = __dirname.substr(0, __dirname.lastIndexOf('/'))
console.log('Directory for which license will be generated', path)
const options = {
  path,
  isExcel: true,
}
licenseChecker.run(options)
