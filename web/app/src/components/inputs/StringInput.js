import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class StringInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    max: PropTypes.number,
  }

  onChangeText = (evt) => {
    const { onChange, max } = this.props

    var x = evt.target.value
    if (x.length > max)
      x = x.substr(0, max)

    onChange(x)
  }

  render() {
    const { value, placeholder } = this.props
    return (
      <input type='text' value={value} onChange={this.onChangeText}
             placeholder={placeholder} aria-placeholder={placeholder} />
    )
  }
}
