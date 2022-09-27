import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Config from './Config'
import PixelEditor from './PixelEditor'
import Navigation from './Navigation'
import SocketCmdCenter from './SocketCmdCenter'
import WiFiConfig from './WiFiConfig'

import IconTest from '../components/IconTest'

import FilesSidebar from './FilesSidebar'

import './App.css';


class App extends Component {
  static propTypes = {
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  render() {
    const { location } = this.props

    const controls = []
    switch (location) {
      case "wifi":
        controls.push(<WiFiConfig key='soc'/>)
        break;

      case 'socket-test':
        controls.push(<SocketCmdCenter key='soc'/>)
        break;

      case "mode-Image":
        // Sidebar macht seite zu gross
        controls.push(<FilesSidebar key='fS'/>)
        controls.push(<PixelEditor key="mImage" />)
        break;

      case "config":
        controls.push(<Config key='cfg' />)
        break;

      case "help":
        controls.push(<IconTest key='icontest' />)
        break;

      default:
        controls.push(<div key="uknw">MS3000 Error 404 Unknown location: {location}</div>)
    }

    //
    // style={{width: '100%', height:'100%', display: 'flex', flexFlow: 'column'}}
    return (
      <div >
        <Navigation/>
        {controls}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { shifterState } = state.ms3000
  const { location } = state.navigation

  return {
    shifterState,
    location
  }
}

export default connect(mapStateToProps)(App)
