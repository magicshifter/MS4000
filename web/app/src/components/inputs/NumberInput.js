import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class NumberInput extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  onChangeNumber = (evt) => {
    const { onChange } = this.props

    const x = evt.target.value
    var n = parseInt(x, 10)
    n = isNaN(n) ? 0 : n
    onChange(n)
  }

  render() {
    const { value, min, max } = this.props

    return (
      <input type='number' min={min} max={max} value={value} onChange={this.onChangeNumber} />
    )
  }
}
