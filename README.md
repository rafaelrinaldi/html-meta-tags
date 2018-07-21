[url]: https://rinaldi.io

# html-meta-tags [![Build Status](https://semaphoreci.com/api/v1/rafaelrinaldi/html-meta-tags/branches/master/badge.svg)](https://semaphoreci.com/rafaelrinaldi/html-meta-tags)

> Generate HTML meta tags from JSON data.

## Install

```sh
npm install html-meta-tags -g
```

## Usage

#### CLI

You can either pipe data from the standard input or specify a file path for the program.

```sh
$ html-meta-tags

Usage: html-meta-tags <file> [options]

Example:
  cat data.json | html-meta-tags

Options:
  -v --version          Display current program version
  -h --help             Display help and usage details
     --no-charset       Do not specify UTF-8 as document charset
     --no-og            Do not generate Open Graph meta tags
     --no-twitter       Do not generate Twitter meta tags

$ echo '
{
  "title": "My Website",
  "url": "https://mywebsite.com",
  "keywords": ["blockchain", "infosec", "crypto"],
  "description": "This is my personal website"
}' | html-meta-tags
<meta charset="utf-8">
<meta name="title" content="My Website">
<meta name="url" content="https://mywebsite.com">
<meta name="keywords" content="blockchain, infosec, crypto">
<meta name="description" content="This is my personal website">
<meta name="twitter:description" content="This is my personal website">
<meta name="twitter:title" content="My Website">
<meta property="og:description" content="This is my personal website">
<meta property="og:title" content="My Website">
```

#### Node.js

```js
var htmlMetaTags = require('html-meta-tags')
var data = require('./data.json')

console.log(htmlMetaTags(data))
```

## API

### htmlMetaTags(data, [options])

Returns an HTML string containing a representation of all meta tags from `data`.

#### data

Type: `Object`  

Meta tags in object notation format.  
* You can use arrays for comma-separated such as `keywords` or `viewport`.
* If a specific value for a prefixed key is specified it will take precedence over the default.
* Prefixed keys should have their own entry, `og:title` for example, should be represented as:
```js
{
  og: {
    title: 'value'
  }
}
```

#### options

Type: `Object`  

##### shouldIgnoreCharset

Type: `boolean`  
Default: `false`  

Whether or not it should render UTF-8 charset meta tag.

##### shouldIgnoreTwitter

Type: `boolean`  
Default: `false`  

Whether or not it should render Twitter specific meta tags.

##### shouldIgnoreOpenGraph

Type: `boolean`  
Default: `false`  

Whether or not it should render Open Graph specific meta tags.

## License

MIT © [Rafael Rinaldi][url]

---

<p align="center">
  <a href="https://buymeacoff.ee/rinaldi" title="Buy me a coffee">Buy me a ☕</a>
</p>
