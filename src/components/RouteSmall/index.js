import React, {Component, PropTypes} from 'react'
import {View, TouchableOpacity} from 'react-native'
import Map from '../Map'
import Img from '../Img'
import T from '../T'
const routeInfoBackground = require('@assets/images/backgrounds/route-info-background.png')
import styles from './styles'

const PROP_TYPES = {
  routes: PropTypes.object,
  routePressed: PropTypes.func,
}

class RouteSmall extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {route, routePressed} = this.props
    return (
      <TouchableOpacity
        onPress={() => {routePressed(route)}}
        style={styles.container}>
        <View style={styles.mapContainer}>
          <Map
            path={route.waypoints.coordinates}
            width={200}
            height={320}
          />
        </View>
        <View style={styles.routeInfoContainer}>
          <View style={styles.routeInfoBackgroundContainer}>
            <Img
              src={routeInfoBackground}
              customStyles={styles.routeInfoBackground}
            />
          </View>
          <View style={styles.routeInfo}>
            <T
              color={'black'}
              styles={{backgroundColor: 'rgba(0,0,0,0)', marginTop: 10, marginBottom: 5,}}
              size={14}
              weight={'semiBold'}
            >
              {route.name}
            </T>
            <T
              styles={styles.distance}
              size={11}
              weight={'semiBold'}
            >
              2
            </T>
            <T
              styles={styles.units}
              size={9}
              weight={'light'}
            >
              Miles Away
            </T>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

RouteSmall.propTypes = PROP_TYPES

export default RouteSmall
