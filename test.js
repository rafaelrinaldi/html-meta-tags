var test = require('tape')
var htmlMetaTags = require('./')
var data = {
  title: 'Title',
  url: 'https://site.com',
  description: 'Description'
}

test('Should generate default output properly', function (t) {
  var html = htmlMetaTags(data)
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('Should not render UTF-8 charset if flag is on', function (t) {
  var html = htmlMetaTags(data, { shouldIgnoreCharset: true })
  var expected = `<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('Should not render Twitter meta tags if flag is on', function (t) {
  var html = htmlMetaTags(data, { shouldIgnoreTwitter: true })
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta property="og:description" content="Description">
<meta property="og:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('Should not render Open Graph meta tags if flag is on', function (t) {
  var html = htmlMetaTags(data, { shouldIgnoreOpenGraph: true })
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('Should generate keywords properly', function (t) {
  var html = htmlMetaTags(
    Object.assign({}, data, {
      keywords: ['foo', 'bar', 'baz']
    })
  )
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="keywords" content="foo, bar, baz">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('Should generate ordinary meta tags properly', function (t) {
  var html = htmlMetaTags(
    Object.assign({}, data, {
      viewport: ['width=device-width', 'initial-scale=1']
    })
  )
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:title" content="Title">`

  t.equal(html, expected)
  t.end()
})

test('If a meta tag is already defined it should take precedence', function (t) {
  var html = htmlMetaTags(
    Object.assign({}, data, {
      twitter: { title: 'Twitter Title' },
      og: { title: 'Open Graph Title' }
    })
  )
  var expected = `<meta charset="utf-8">
<meta name="title" content="Title">
<meta name="url" content="https://site.com">
<meta name="description" content="Description">
<meta name="twitter:description" content="Description">
<meta name="twitter:title" content="Twitter Title">
<meta property="og:description" content="Description">
<meta property="og:title" content="Open Graph Title">`

  t.equal(html, expected)
  t.end()
})
