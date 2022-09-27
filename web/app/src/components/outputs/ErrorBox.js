import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function ErrorBox({ error }) {
  return (
    error ?
        <li className="pure-menu-item">
          <span style={{border: "2px solid red", padding:"4px"}}>{error.toString()}</span>
        </li> :
        null
    )
}
