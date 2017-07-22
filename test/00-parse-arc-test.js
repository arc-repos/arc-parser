var test = require('tape')
var fs = require('fs')
var parse = require('../')


var parsed
test('test base mock file', t=> {
  t.plan(11)
  var mock = fs.readFileSync('./test/00-mock-simple-arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  t.ok(parsed.hasOwnProperty('attr'), 'has attr')
  t.ok(Array.isArray(parsed.attr), 'attr is array')
  t.ok(parsed.attr[0] === 'single', "first member is string 'single'")
  t.ok(parsed.attr[1] === false, 'second member is a false')
  t.ok(parsed.attr[2] === 1, 'third member is a 1')
  t.ok(parsed.attr[3] === -1, 'forth member is a 1')
  t.ok(Array.isArray(parsed.attr[4]), 'fifth member is an array with two members')
  t.ok(parsed.attr[4].length === 2, 'fifth member is a tuple')
  t.ok(parsed.attr[5].length === 7, 'sixth member is a vector of seven members')
  t.ok(typeof parsed.attr[6] == 'object' && parsed.attr[6] !== null, 'seventh member is a plain object')
  console.log(JSON.stringify(parsed, null, 2))
})

/*
{
  "attr": [
    "single",
    false,
    1,
    -1,
    [
      "tuple",
      "tuple"
    ],
    [
      1,
      2.1,
      33,
      "fourtyfour",
      true,
      false,
      "v"
    ],
    {
      "object": {
        "key": "value",
        "gud": true,
        "bad": false
      }
    },
    // TODO test these values above
    "another-single_value",
    {
      "another-obj": {
        "$k": 666,
        "another-key": "another_value/baz.txt",
        "undef": false,
        "asdf": [
          1,
          2,
          3,
          "four"
        ]
      }
    }
  ]
}*/

test('test aws arc by parsing mock-arc', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/00-mock-aws-arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})
