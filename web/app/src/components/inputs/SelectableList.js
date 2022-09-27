import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class SelectableList extends Component {
  static propTypes = {
    selectedId: PropTypes.string,
    fieldId: PropTypes.string,
    fieldText: PropTypes.string,
    lines: PropTypes.number,
    listItems: PropTypes.array,
    select: PropTypes.func,
    doubleClick: PropTypes.func,
    filter: PropTypes.func,
  }

  static defaultProps = {
    selectedId: undefined,
    fieldId: 'id',
    fieldText: 'name',
    lines: 15,
    listItems: [],
    select: () => {},
    doubleClick: () => {},
  }

  bubbleEvent =
    (e, eventHandler) => {
      if (eventHandler) {
        var id = e.target.value
        eventHandler(id)
      }
    }

  selectEvent =
    (e) => {
      this.bubbleEvent(e, this.props.select)
    }

  doubleClickEvent =
    (e) => {
      this.bubbleEvent(e, this.props.doubleClick)
    }

  render() {
    const {
      fieldId, fieldText,
      listItems, selectedId,
      filter,
      lines: size,
    } = this.props

    // console.log("render list, nr of items: " + listItems.length);

    return (
      <div
        onChange={this.selectEvent}
        onClick={this.selectEvent}
      >
        <select
          value={selectedId}
          onDoubleClick={this.doubleClickEvent}
          size={size}
          style={{ maxWidth: '100%', width: '100%' }}
        >
          {
            listItems.map(
              (result, idx) => {
                if (!filter || filter(result)) {
                  return (
                    <option
                      key={result[fieldId]}
                      value={result[fieldId]}>
                      {result[fieldText]}
                    </option>)
                }
                else {
                  return null
                }
              })
          }
        </select>
      </div>
    )
  }
}

export default SelectableList
