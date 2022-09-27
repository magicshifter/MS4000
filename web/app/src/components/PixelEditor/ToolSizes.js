import React, {Component} from 'react'
import PropTypes from "prop-types";

import {defaultParseInt} from '../../utils/types'

import './ToolsMenu.css'

export default class ToolSizes extends Component {
  static propTypes = {
    sizes: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClick = (evt) => {
    const { onChange } = this.props
    const tool = defaultParseInt(evt.currentTarget.dataset["size"], 1)

    console.log("clicked ToolSizes", tool, evt.currentTarget)
    onChange(tool)
  }


  render() {
    const controls = []

    const { sizes, value } = this.props

    for (let i = 0; i < sizes.length; i++) {
      const elem = sizes[i]
      const className = elem === value ? "ToolsMenuSelectedTool" : "ToolsMenuTool"

      controls.push(
        <li key={i} style={{"textAlign": "center", "alignItems": "center", alignContent: "center", alignment: "center"}}
            className={"pure-menu-item button-sized ToolsMenuTooltip " + className} data-size={elem} onClick={this.onClick} >
          <span className="ToolsMenuTooltipText">{elem}px</span>
          <div style={{"textAlign": "center", "alignItems": "center", alignContent: "center", alignment: "center",
            width: "1em", height: "1em"}}>
           <div style={{"textAlign": "center", "alignItems": "center", alignContent: "center", alignment: "center",
             width: "" + (elem * 4) + "px", height: "" + (elem * 4) + "px", backgroundColor: "blue"}}></div>
          </div>
        </li>
      )
    }

    return controls
  }
}
