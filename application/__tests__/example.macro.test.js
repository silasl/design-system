/* eslint-env jest */

const nunjucks = require('nunjucks')
const highlighter = require('../../lib/highlighter')
const fileHelper = require('../../lib/file-helper')
const { pathFromRoot } = require('../../tasks/gulp/util')

const macrosPath = pathFromRoot('application', 'templates', 'partials')
const loader = new nunjucks.FileSystemLoader(macrosPath)
var njk = new nunjucks.Environment(loader, {
  trimBlocks: true,
  lstripBlocks: true
})

njk.addFilter('highlight', highlighter)
njk.addGlobal('getHTMLCode', fileHelper.getHTMLCode)
njk.addGlobal('getNunjucksCode', fileHelper.getNunjucksCode)

function render (macro, params) {
  const macroName = macro.match(/_?(.*)\.njk/)[1]
  const macroParams = JSON.stringify(params)

  const macroString = `
  {%- from "${macro}" import ${macroName} -%}
  {{- ${macroName}(${macroParams}) -}}
  `

  const output = njk.renderString(macroString)
  console.log('TCL: render -> output', output)
  // return output
}

describe('Single page example macro english html only', () => {
  // {{ example({
  //   item: "notification-badge",
  //   example: "default",
  //   html: true,
  //   nunjucks: true,
  //   open: false
  // }) }}

  //   const parameters = { html: `${exampleId}.html` }
  //   const example = render('_example.njk')
  //   const document = documentFactory(parameters, options)
  //   const exampleSrc = path.join('examples', exampleId + '.html').toString()
  //   const exampleFrame = document.getElementById(`${exampleId}_frame`)
  //   const exampleLink = document.querySelector('.app-example__link a')

  test('should render an iFrame for the example with the correct attribute values', () => {
    render('_example.njk')
    render('_example.njk', { html: true })
    // console.log('TCL: example', example)
    //     expect(exampleFrame).not.toBeNull()
    //     expect(exampleFrame.tagName.toLowerCase()).toBe('iframe')
    //     expect(exampleFrame.name).toBe(`${exampleId}_frame`)
    //     expect(parseInt(exampleFrame.height)).toEqual(defaultHeight)
    //     expect(exampleFrame.src).toMatch(exampleSrc)
  })

  //   test('should have a link to open the example html in a new window or tab', () => {
  //     expect(exampleLink).not.toBeNull()
  //     expect(exampleLink.href).toBe(exampleSrc)
  //     expect(exampleLink.target).toBe('_blank')
  //   })

  //   test('Should not have a language toggle for English only examples', () => {
  //     const languageToggleLink = document.querySelector('a.language-toggle')
  //     expect(languageToggleLink).toBeNull()
  //   })

  //   test('should have a button to show HTML code examples', () => {
  //     const codeExampleTabsContainer = document.getElementsByClassName('app-tabs')[0]
  //     expect(codeExampleTabsContainer.nodeName.toLowerCase()).toBe('ul')

  //     const exampleToggleLinks = codeExampleTabsContainer.querySelectorAll('li.app-tabs__item a')
  //     expect(exampleToggleLinks.length).toBe(1)

  //     const htmlExampleToggleLink = exampleToggleLinks[0]
  //     expect(htmlExampleToggleLink.nodeName.toLowerCase()).toBe('a')
  //     expect(htmlExampleToggleLink.getAttribute('href')).toBe(`#${exampleId}_html`)
  //     expect(htmlExampleToggleLink.getAttribute('aria-controls')).toBe(`${exampleId}_html`)
  //     expect(htmlExampleToggleLink.text).toBe('HTML')
  //   })

  //   test('should set the iframe height when it is supplied', () => {
  //     const frameHeight = 256
  //     const document = documentFactory(Object.assign({ height: frameHeight }, parameters), options)
  //     const exampleFrame = document.getElementById(`${exampleId}_frame`)
  //     expect(parseInt(exampleFrame.height)).toBe(256)
  //   })

  //   test('Should include the escaped HTML markup from the examples', () => {
  //     const exampleHTMLCode = document.getElementById(`${exampleId}_html`)
  //     const fixtureHTML = fs.readFileSync(path.join(fixturePath, 'test.html')).toString()
  //     expect(exampleHTMLCode.querySelector('pre code').innerHTML).toEqual(htmlEscape(fixtureHTML))
  //   })
  // })

  // xdescribe('When a pattern has a nunjucks example', () => {
  //   const parameters = { html: `${exampleId}.html`, nunjucks: `${exampleId}.njk` }
  //   const document = documentFactory(parameters, options)

  //   test('should have a button to show Nunjucks example', () => {
  //     const codeExampleTabsContainer = document.getElementsByClassName('app-tabs')[0]

  //     const exampleToggleLinks = codeExampleTabsContainer.querySelectorAll('li.app-tabs__item a')
  //     expect(exampleToggleLinks.length).toBe(2)

  //     const nunjucksExampleToggleLink = exampleToggleLinks[1]
  //     expect(nunjucksExampleToggleLink.nodeName.toLowerCase()).toBe('a')
  //     expect(nunjucksExampleToggleLink.getAttribute('href')).toBe(`#${exampleId}_nunjucks`)
  //     expect(nunjucksExampleToggleLink.getAttribute('aria-controls')).toBe(`${exampleId}_nunjucks`)
  //     expect(nunjucksExampleToggleLink.text).toBe('Nunjucks')
  //   })

  //   test(' Should include the Nunjcks macro code for the example\n\t\u001b[33;1mTODO: needs a better way to do the inclusion\u001b[0m', () => {
  //     const exampleCode = document.getElementById(`${exampleId}_nunjucks`)
  //     const fixtureCode = fs.readFileSync(path.join(fixturePath, 'test.njk')).toString()
  //     expect(exampleCode.querySelector('pre code').innerHTML).toEqual(nunjucksEscape(fixtureCode))
  //   })
  // })

  // xdescribe('When a pattern has Welsh content', () => {
  //   const welshOptions = JSON.parse(JSON.stringify(options))
  //   welshOptions.filters = Object.assign({}, options.filters)
  //   welshOptions.globals = Object.assign({ hasWelsh: true }, welshOptions.globals)

  //   const parameters = { html: `${exampleId}.html` }

  //   const document = documentFactory(parameters, welshOptions)

  //   test('Should include a language toggle for examples', () => {
  //     const languageToggleLink = document.querySelector('a.language-toggle')
  //     expect(languageToggleLink).not.toBeNull()
  //   })

  //   test('Should have a Welsh Language example version in a hidden div', () => {
  //     const exampleHTMLCode = document.getElementById(`${exampleId}_welsh`)
  //     expect(exampleHTMLCode.classList).toContain('govuk-visually-hidden')
  //     expect(exampleHTMLCode.getAttribute('aria-hidden')).toBe('true')

  //     const fixtureHTML = fs.readFileSync(path.join(fixturePath, 'test.cy.html')).toString()
  //     expect(exampleHTMLCode.querySelector('pre code').innerHTML).toEqual(htmlEscape(fixtureHTML))
  //   })
  // })

  // xdescribe('Multipage example macro', () => {
  //   const parameters = { html: ['example1.html', 'example2.html'] }
  //   const document = documentFactory(parameters, options)
  //   const exampleFrame = document.getElementById('example1_frame')

//   test('should set the iframe to use the first example page when the html parameter is an Array', () => {
//     expect(exampleFrame.name).toBe('example1_frame')
//     expect(exampleFrame.src).toBe('examples' + '/' + parameters.html[0])
//   })
//   test('should not include the example code buttons by default', () => {
//     expect(document.getElementsByClassName('app-tabs__item').length).toBe(0)
//   })
//   test('should include the example code buttons when requested', () => {
//     const parameters = {
//       html: ['test.html', 'test.html'],
//       showExampleCode: true
//     }
//     const exampleToggleLinks = documentFactory(parameters, options).getElementsByClassName('app-tabs__item')
//     expect(exampleToggleLinks.length).toBeGreaterThan(0)
//   })
})
