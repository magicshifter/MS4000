import React, {Component} from 'react'
import PropTypes from "prop-types";


export default class EnumControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    radioButtons: PropTypes.bool
  }

  onChangeSelect = (evt) => {
    const { field, onChange } = this.props
    const { target } = evt

    if (target.type === "radio") {
      if (!target.checked) {
        console.log("ignoring false changeSelect!", evt)
      }
    }

    const x = target.value
    var n = parseInt(x, 10)
    n = isNaN(n) ? 0 : n

    onChange(n, field)
  }

  getValue = () => {
    let { value } = this.props
    value = value || 0
    return value
  }

  render() {
    const { field, id, radioButtons } = this.props
    const value = this.getValue()

    const root = field.root

    const typeName = field.parent ? field.parent.name + '.' + field.type : field.type

    const t = root.lookupTypeOrEnum(typeName)
    //console.log("render enum", t)

    const controls = []


    const keys = Object.keys(t.values)
    if (radioButtons) {
      for (var kk in keys) {
        const k = keys[kk]
        const f = t.values[k]

        const genid = field.name + k
        console.log("rad", k, f, id)
        controls.push(
            <div className="pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-8 ms3000-input-radio">
              <label key={f} htmlFor={genid} >
              {k} <br/>

            <div class="fat-ms-button">
            <div></div>
            </div>

                <span className="ms3000-input-flow">
                  <input
                    type="radio"
                    className="fat-ms-button"
                    value={f}
                    id={genid}
                    checked={value === f }
                    onChange={this.onChangeSelect} />
                </span>
              </label>
            </div>
        )
      }
      return (
        <div className="pure-g" style={{ }}>
          {controls}
        </div>
      )
    }
    else {

      for (var kk in keys) {
        const k = keys[kk]
        const f = t.values[k]
        //console.log(k)
        controls.push(<option key={f} value={f} label={k} />)
      }
      return (
        <select id={ id } value={value} onChange={this.onChangeSelect}>
          {controls}
        </select>
      )
    }


  }
}
