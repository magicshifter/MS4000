import React, {Component} from 'react'
import PropTypes from "prop-types";

import IconButton from './inputs/IconButton'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Collapsable extends Component {
  static propTypes = {
    enlarged: PropTypes.bool.isRequired,
    closedChildren: PropTypes.any,
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.object,
    tooltip: PropTypes.string,
    float: PropTypes.string,
  }

  onClick = (evt) => {
    const { onChange, enlarged } = this.props
    onChange(!enlarged)
  }


  render() {
    const { children, enlarged, icon, tooltip, float, top, bottom, left, right } = this.props

    console.log("rnder side", this.props)

    const s = {
      border: "3px solid ivory",
      float
      //position: "absolute", top, right, bottom, left, "zIndex": 100
    }

    return (
      <div style={s}>

        <IconButton icon={icon} tooltip={tooltip} onClick={this.onClick}/>

        {enlarged ? children : null}
      </div>
    )
  }
}

/* <div className="pure-menu" style={{paddingBottom: "0px"}}>
          <ul className="pure-menu-list">
            <IconButton icon={icon} tooltip={tooltip} onClick={this.onClick}/>
          </ul>
        </div>*/
