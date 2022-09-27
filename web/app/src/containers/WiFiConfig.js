import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as socketActions from '../actions/socket'


class WiFiConfig extends Component {
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

    console.log("WiFiConfig render", messages, users, username )


    return (
      <div>
        <h1>WiFi Config</h1>
        <h2>MS3000 Accesspoint Settings</h2>
        <p>
          That's the name and password for the WiFi the MS3000 will create if it does not find one in the list
          of stored accesspoints to connect to below.
        </p>

        <p>
          settings/ap
        </p>

        <h2>MS3000 Server Settings</h2>
        <p>The name and port of the MS3000 application server</p>
        <p>settings/server</p>

        <h2>List of Accesspoints to connect to</h2>
        <p>settings/wifi/list</p>
        <p>settings/wifi/preferred</p>

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

export default connect(mapStateToProps)(WiFiConfig)
