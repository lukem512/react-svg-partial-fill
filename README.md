# react-svg-partial-fill

React component that fills an SVG shape by a specified amount.

## Installation

```
npm install --save react-svg-partial-fill
```

## Usage

```js
const fs = require('fs')
const SvgPartialFill = require('react-svg-partial-fill')

const svgString = fs.readFileSync('./shape.svg', 'utf8')

// ...

render() {
  return <SvgPartialFill svg={svgString} percent={50} fill="lightskyblue" />
}
```

The component accepts the following props:

* `width` - the display width
* `height` - the display height
* `background` - the background color of the
* `fill` - the color to fill the SVG with
* `percent` - the percentage to fill the shape
* `svg` - the contents of an SVG file as a `string`
* `style` - a JSX style object

## License

MIT © Luke Mitchell
