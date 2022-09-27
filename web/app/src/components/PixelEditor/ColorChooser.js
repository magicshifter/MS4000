import React, {Component} from 'react'
import PropTypes from "prop-types";
import {createRGBFromHex, hexFromRGB} from '../../utils/color'

import './ColorChooser.css'

export default class ColorChooser extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { color } = this.props

    const hex = hexFromRGB(color)
    return (
      <span className="ColorChooser" style={{backgroundColor: hex}}>
        <input  type="color" value={hexFromRGB(color)} onChange={this.onChangeColor}/>
        <div>{hex}</div>
      </span>
    )
  }

  onChangeColor = (evt) => {
    const { onChange} = this.props
    const hex = evt.target.value
    const rgb = createRGBFromHex(hex)
    onChange(rgb)
  }
}
