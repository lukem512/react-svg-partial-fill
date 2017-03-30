import React from 'react'
import parse from 'parse-svg-path'
import extract from 'extract-svg-path'

const SvgPartialFill = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    background: React.PropTypes.string,
    fill: React.PropTypes.string,
    percent: React.PropTypes.number
  },

  componentWillMount() {
    this.loadSvg(this.props.src):
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.loadSvg(nextProps.src);
    }
  },

  // TODO: add a random id to svgPath
  renderDefs() {
    return (<svg width="0px" height="0px">
      <defs>
        <clipPath id="svgPath" clipPathUnits="objectBoundingBox">
          <path d={this.state.pathData} />
        </clipPath>
      </defs>
    </svg>)
  },

  renderSvg() {
    const {
      width = '50px',
      height = '50px',
      background: backgroundColor = 'white',
      fill = 'red',
      percent = '33'
    } = this.props;

    // TODO: specify direction in props
    return (
      <div class="svg-outer" style={{
        backgroundColor,
        width,
        height
      }}>
        <div class="svg-inner" style={{
          background: `linear-gradient(to right, ${fill}, ${fill} ${percent}%, transparent ${percent}%)`,
          clipPath: 'url(#svgPath)';
          width: '100%',
          height: '100%'
        }}/>
      </div>
    )
  },

  render() {
    return (
      {this.renderDefs()}
      {this.renderSvg()}
    )
  },

  loadSvg(src) {
    const path = extract(src)
    this.setState({
      pathData: parse(path)
    })
  }
})

export default SvgPartialFill
