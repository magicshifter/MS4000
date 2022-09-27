import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Icon from '../outputs/Icon'

export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    rotate: PropTypes.bool,
    className: PropTypes.string,
  }

  render() {
    const { icon, onClick, tooltip, rotate, className } = this.props

    const style = {}
    if (tooltip) {
      const l = tooltip.length
      if (l > 10) {
        style.width = l * 12
      }
    }

    return (
      <div className={"icon-button ToolsMenuTooltip" + (className ? " " + className : "")}>
        <div className="ToolsMenuTooltipText" style={style}>{tooltip}</div>
        <button className="pure-button" onClick={onClick}>
          <span id={rotate ?'loading' : null} style={{display: 'inline-block'}}>
            <Icon icon={icon} />
          </span>
        </button>
      </div>
    )
  }
}


