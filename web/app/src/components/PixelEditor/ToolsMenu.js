import React, {Component} from 'react'
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './ToolsMenu.css'

export default class ToolsMenu extends Component {
  static propTypes = {
    structure: PropTypes.array.isRequired,
    tool: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
  }

  onClickTool = (evt) => {
    const { onChange } = this.props
    const tool = evt.currentTarget.dataset["tool"]

    console.log("clicked tool", tool, evt.currentTarget)
    onChange(tool)
  }


  render() {
    const controls = []

    const { structure, tool } = this.props

    for (let i = 0; i < structure.length; i++) {
      const elem = structure[i]
      const className = elem.name === tool ? "ToolsMenuSelectedTool" : "ToolsMenuTool"

      controls.push(
        <li key={i} className={"pure-menu-item button-sized ToolsMenuTooltip " + className} data-tool={elem.name} onClick={this.onClickTool} >
          <span className="ToolsMenuTooltipText">{elem.label || elem.name}</span>
          <FontAwesomeIcon icon={elem.icon} style={{textShadow: "2px 2px #ff0000"}}/>
        </li>
      )
    }

    return controls
  }
}
