
// function render (componentName, params, children = false) {
//   if (typeof params === 'undefined') {
//     throw new Error('Parameters passed to `render` should be an object but are undefined')
//   }

//   const macroName = componentNameToMacroName(componentName)
//   const macroParams = JSON.stringify(params, null, 2)

//   let macroString = `{%- from "${componentName}/macro.njk" import ${macroName} -%}`

//   // If we're nesting child components or text, pass the children to the macro
//   // using the 'caller' Nunjucks feature
//   if (children) {
//     macroString += `{%- call ${macroName}(${macroParams}) -%}${children}{%- endcall -%}`
//   } else {
//     macroString += `{{- ${macroName}(${macroParams}) -}}`
//   }

//   const output = nunjucks.renderString(macroString)
//   return cheerio.load(output)
// }
