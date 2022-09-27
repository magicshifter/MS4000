import React, {Component} from 'react'
import PropTypes from 'prop-types'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as theIcons from "@fortawesome/free-solid-svg-icons";


export default class FilesSidebar extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  render() {
    const controls = []

    console.log("render icon test", theIcons)

    const kk = Object.keys(theIcons)
    for (var i = 0; i < kk.length; i++) {
      const k = kk[i]
      const icon = theIcons[k]
      //console.log("icon", k)
      controls.push(
        <span key={i}>
          <FontAwesomeIcon icon={icon} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
          {k}
        </span>
      )
    }


    return (
      <div>
        {controls}
      </div>
    )
  }
}


