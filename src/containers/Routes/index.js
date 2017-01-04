import React, {Component, PropTypes} from 'react'
import {View, ScrollView} from 'react-native'
import COPY from '@constants/copy'
import Background from './Background'
import Nav from './Nav'
import Header from './Header'
import RouteMedium from '@components/RouteMedium'
import styles from './styles'

const PROP_TYPES = {
  route: PropTypes.object,
  routes: PropTypes.array,
}

class Routes extends Component {
  constructor(props) {
    super(props)
    this.renderRoutes = this.renderRoutes.bind(this)
  }
  backPressed() {
    console.log("### BACK PRESSED")
  }
  renderRoutes() {
    const {routes} = this.props
    return routes.map((route) => {
      return (
        <RouteMedium
          key={route._id}
          route={route}
        />
      )
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
        >
          <Header
            copy={COPY.routes.header}
          />
          {this.renderRoutes()}
        </ScrollView>
        <Nav
          backPressed={this.backPressed}
        />
      </View>
    )
  }
}

Routes.propTypes = PROP_TYPES

export default Routes
