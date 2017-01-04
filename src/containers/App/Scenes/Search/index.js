import React, {Component, PropTypes} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {View, ScrollView} from 'react-native'
import T from '@components/T'
import Icon from '@components/Icon'
import RouteSmall from '@components/RouteSmall'
import styles from './styles'

const PROP_TYPES = {
  routes: ImmutablePropTypes.list,
  routePressed: PropTypes.func,
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.renderRoutes = this.renderRoutes.bind(this)
  }
  renderBackArrow() {
    return (
      <Icon
        styles={styles.iconStyles}
        type={'backArrow'}
        color={'white'}
        size={'xLarge'}
      />
    )
  }
  renderRoutes() {
    const {routes, routePressed} = this.props
    return routes.toJS().map((route, index) => {
      const firstTileStyles = index === 0 ? {width: 280} : null
      const backArrow = index === 0 ? this.renderBackArrow() : null
      return (
        <View
          key={route._id}
          ref={route._id}
          style={{...styles.placeHolderRoute, ...firstTileStyles}}
        >
          <View style={styles.route}>
            {backArrow}
            <RouteSmall
              route={route}
              routePressed={routePressed}
            />
          </View>
        </View>
      )
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapControlsContainer}>

        </View>
        <View style={styles.routesContainer}>
          <ScrollView
            style={styles.scrollContainer}
            horizontal={true}>
            {this.renderRoutes()}
          </ScrollView>
        </View>
      </View>
    )
  }
}

Search.propTypes = PROP_TYPES

export default Search
