import React, {Component} from 'react'
import PropTypes from "prop-types";
import {hexFromRGB} from "../../utils/color"


export default class PixelPreview extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    pixel: PropTypes.object.isRequired,
  }

  componentDidMount() {
    var c = this.refs.canvas
    var ctx = c.getContext("2d");
    this.canvasContext = ctx

    this.drawPixel()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pixel !== nextProps.pixel) {
      return true;
    }
    return false;
  }

  drawPixel = () => {
    //console.log("drawing preview")
    var index = 0

    const { pixel, width, height, scale } = this.props
    const ctx = this.canvasContext

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        ctx.fillStyle= hexFromRGB(pixel.get(index));
        ctx.fillRect(x*scale,y*scale,scale,scale);

        index++;
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.drawPixel()
  }


  render() {
    let { width, height, scale } = this.props


    const cw = width * scale
    const ch = height * scale

    return (
      <canvas ref="canvas" width={cw} height={ch}
      />
    )
  }
}
