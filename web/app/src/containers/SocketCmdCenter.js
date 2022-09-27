import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as socketActions from '../actions/socket'


class SocketCmdCenter extends Component {
  static propTypes = {
    username: PropTypes.string,
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    shifterState: PropTypes.object.isRequired,
  }

  onClickLogin = e => {
    const username = this.refs.username.value;
    console.log('username', username);
    if (username && username.length > 0) {
      this.props.dispatch(socketActions.login({ username }));
    }
  }

  onClickLogout = e => {
    this.props.dispatch(socketActions.logout());
  }

  onClickSendMessage = e => {
    const value = this.refs.message.value;
    console.log('message', value);
    if (value && value.length > 0) {
      this.props.dispatch(socketActions.sendMessage({ text: value }));
    }
  }

  render() {
    const { messages, users, username } = this.props

    console.log("SocketCmdCenter render", messages, users, username )


    return (
      <div>
        <h1>Socket Cmd Center</h1>
        {username ?
          <span>
            <div>logged in as {username}</div>
            <button onClick={this.onClickLogout}>logout</button>

            <input ref="message" type='text' placeholder="chat message" />
            <button onClick={this.onClickSendMessage}>login</button>
          </span>
          :
          <span>
            <div>Not yet logged in</div>
            <input ref="username" type='text' placeholder="choose username" />
            <button onClick={this.onClickLogin}>login</button>
          </span>
        }
        <h2>Users</h2>
        <div>
          {Object.keys(users).map((username, i) =>
            <div key={i}>
              {username}
            </div>
          )}
        </div>
        <h2>Messages</h2>
        <div>
          {messages.list.map(id => messages.entities[id]).map((m, i) =>
            <div key={i}>
              {m.username}: {m.text}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { messages, users, app } = state.sockets
  const { username } = app

  return {
    messages, users, username
  }
}

export default connect(mapStateToProps)(SocketCmdCenter)
