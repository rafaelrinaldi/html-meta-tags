var keys = Object.keys

function flatten (array) {
  return array.reduce(function (previous, current) {
    return previous.concat(current)
  })
}

function processStandard (data) {
  return keys(data)
    .filter(function (key) {
      return !['twitter', 'og'].includes(key)
    })
    .map(function (key) {
      var value = data[key]

      return {
        name: key,
        content: Array.isArray(value) ? value.join(', ').trim() : value
      }
    })
}

function processOptional () {
  return [{ charset: 'utf-8' }]
}

function processPrefixed (data, prefix) {
  var attribute = /^og/i.test(prefix) ? 'property' : 'name'

  var defaults = ['description', 'image', 'title']
    .map(function (key) {
      // Bypass key if not defined or if defined under a prefix
      if (!data[key] || (data[prefix] && data[prefix].hasOwnProperty(key))) {
        return null
      }
      return { [attribute]: `${prefix}:${key}`, content: data[key] }
    })
    .filter(function (item) {
      return item !== null
    })

  var prefixed = data[prefix]
    ? keys(data[prefix]).map(function (key) {
      return { [attribute]: `${prefix}:${key}`, content: data[prefix][key] }
    })
    : []

  return flatten([defaults, prefixed])
}

function render (data) {
  return data
    .map(function (node) {
      return keys(node)
        .reduce(function (_, key) {
          return `${_} ${key}="${node[key]}"`
        }, '<meta')
        .concat('>')
    })
    .join('\n')
}

module.exports = function (data, _options) {
  var options = Object.assign(
    {
      shouldIgnoreCharset: false
    },
    _options
  )

  var tree = []

  if (!options.shouldIgnoreCharset) {
    tree.push(processOptional(data))
  }

  tree.push(processStandard(data))

  if (!options.shouldIgnoreTwitter) {
    tree.push(processPrefixed(data, 'twitter'))
  }

  if (!options.shouldIgnoreOpenGraph) {
    tree.push(processPrefixed(data, 'og'))
  }

  return render(flatten(tree))
}
