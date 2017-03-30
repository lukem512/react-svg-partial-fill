import React from 'react'
const viewBox = require('extract-svg-viewbox')
const normalize = require('normalize-svg-coords')
const extract = require('extract-svg-path').parse

const SvgPartialFill = React.createClass({
  propTypes: {
    svg: React.PropTypes.string.isRequired,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    background: React.PropTypes.string,
    fill: React.PropTypes.string,
    percent: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getInitialState() {
    return {
      ready: false,
      rid: Date.now()
    }
  },

  componentWillMount() {
    this.extractPaths(this.props.svg)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.svg !== nextProps.svg) {
      this.extractPaths(nextProps.svg)
    }
  },

  renderDefs() {
    return (<svg width="0px" height="0px">
      <defs>
        <clipPath id={`svgPath-${this.state.rid}`}
          clipPathUnits="objectBoundingBox">
          <path d={this.state.pathData} />
        </clipPath>
      </defs>
    </svg>)
  },

  renderSvg() {
    const {
      width = '50px',
      height = '50px',
      fill = 'lightskyblue',
      fillTo = 'transparent',
      percent = '50',
      background: backgroundColor = 'white',
      direction = 'to right'
    } = this.props;

    return (
      <div className="svg-outer" style={{
        ...this.props.style,
        backgroundColor,
        width,
        height
      }}>
        <div className="svg-inner" style={{
          background: `linear-gradient(${direction}, ${fill}, ${fill} ${percent}%, ${fillTo} ${percent}%)`,
          clipPath: `url(#svgPath-${this.state.rid})`,
          width: '100%',
          height: '100%'
        }}/>
      </div>
    )
  },

  render() {
    return (
      <span>
        {this.state.ready && this.renderDefs()}
        {this.state.ready && this.renderSvg()}
      </span>
    )
  },

  extractPaths(svg) {
    const pathData = normalize({
      viewBox: viewBox(svg),
      path: extract(svg)
    })
    this.setState({
      pathData,
      ready: true
    })
  },
})

export default SvgPartialFill
