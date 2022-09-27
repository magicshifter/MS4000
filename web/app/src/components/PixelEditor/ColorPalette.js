import React, {Component} from 'react'
import PropTypes from "prop-types";
import {equRGB, hexFromRGB} from '../../utils/color'

import './ColorPalette.css'


class ColorButton extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    activeColor: PropTypes.object,
  }

  render() {
    const { color, activeColor } = this.props

    var className = "PaletteItem"
    if (activeColor && equRGB(color, activeColor)) {
      className = "SelectedPaletteItem"
    }

    return (<span data-color={color} onClick={this.onClickColor} className={className} style={{backgroundColor: hexFromRGB(color)}} />)
  }

  onClickColor = () => {
    const { color, onClick} = this.props
    onClick(color)
  }
}

export default class ColorPalette extends Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    activeColor: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  onClickPalette = (color) => {
    const { onChange } = this.props
    console.log("clicked tool", color)
    onChange(color)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.palette !== nextProps.palette || this.props.activeColor !== nextProps.activeColor) {
      return true;
    }
    return false;
  }

  render() {
    const controls = []

    const {palette, activeColor } = this.props

    for (let i = 0; i < palette.length; i++) {
      const elem = palette[i]

      controls.push(
        <li key={i} className="pure-menu-item"><ColorButton color={elem} activeColor={activeColor} onClick={this.onClickPalette}/></li>
      )
    }

    return <span>{controls}</span>
  }
}
