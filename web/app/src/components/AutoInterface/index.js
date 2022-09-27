import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AutoControl from './AutoControl'

import './AutoInterface.css'

export default class AutoInterface extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    legend: PropTypes.string,
    skipInputTag: PropTypes.bool,
  }

  getFromValue = (f) => {
    const { value } = this.props
    if (value) {
      return value[f.name]
    }
    else {
      return null
    }
  }

  onChangeControl = (newSubValue, field) => {
    const { value, type, onChange } = this.props

    //console.log("cntrl changed", newSubValue, field)

    var newValue = Object.assign({}, value, { [field.name]: newSubValue })
    onChange(newValue, type)
  }

  render() {
    const { type, skipInputTag, legend } = this.props
    const controls = []

    const fs = type.fields
    const fKeys = Object.keys(fs)




    fKeys.sort((a, b) => {
      const f1 = fs[a]
      const f2 = fs[b]

      // TODO use custom metadata
      return f1.id - f2.id
    })

    for (var i = 0; i < fKeys.length; i++) {
      const k = fKeys[i]
      const f = fs[k]
      //console.log(f, value)
      controls.push(
        <div key={i} className={ skipInputTag ? "ms3000-control-container" : "ms3000-main-container" }>
          <AutoControl field={f} value={this.getFromValue(f)} onChange={this.onChangeControl}/>
        </div>
      )
    }

    if (skipInputTag) {
      return (
        <fieldset>
          <h2>
            {legend}</h2>
          {controls}
        </fieldset>
      )
    }

    return (
      <form className="">
        <fieldset>
          <legend>{legend}</legend>
            { controls }
        </fieldset>
      </form>
    )
  }
}
