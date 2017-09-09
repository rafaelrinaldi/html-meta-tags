var path = require('path')
var fs = require('fs')
var getStdin = require('get-stdin')
var htmlMetaTags = require('./')
var argv = process.argv.slice(1)
var flags = argv.filter(function (arg) {
  return /^--?/.test(arg)
})

var args = argv.filter(function (arg) {
  return !flags.includes(arg)
})

var help = `Usage: html-meta-tags <file> [options]

Example:
  cat data.json | html-meta-tags

Options:
  -v --version          Display current program version
  -h --help             Display help and usage details
     --no-charset       Do not specify UTF-8 as document charset
     --no-og            Do not generate Open Graph meta tags
     --no-twitter       Do not generate Twitter meta tags`

function hasFlags (allFlags, checkFlags) {
  return allFlags.some(function (flag) {
    return checkFlags.includes(flag)
  })
}

function exitWithSuccess (message) {
  process.stdout.write(message)
  process.exit(0)
}

var needsHelp = hasFlags(flags, ['-h', '--help'])
var needsVersion = hasFlags(flags, ['-v', '--version'])

if (needsHelp) exitWithSuccess(help)
if (needsVersion) exitWithSuccess(require('./package.json').version)

function output (data) {
  var json = JSON.parse(data)
  var html = htmlMetaTags(json, {
    shouldIgnoreCharset: flags.includes('--no-charset'),
    shouldIgnoreTwitter: flags.includes('--no-twitter'),
    shouldIgnoreOpenGraph: flags.includes('--no-og')
  })

  process.stdout.write(html)
}

function processFile (_file) {
  var file = path.join(__dirname, _file)

  return fs.readFile(file, 'utf8', function (error, data) {
    if (error) throw error
    output(data)
  })
}

function processStdin () {
  return getStdin()
    .then(function (data) {
      !data.length ? exitWithSuccess(help) : output(data)
    })
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}

var file = args[1]

file ? processFile(file) : processStdin()
