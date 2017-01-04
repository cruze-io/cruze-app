import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'
import T from '@components/T'
import Img from '@components/Img'
import Map from '@components/Map'
const mapImage = require('@assets/images/other/background-map-placeholder.png')
const mapOverlay = require('@assets/images/other/map-overlay-gradient.png')
const userLocationMarker = require('@assets/images/other/user-location-marker.png')
import styles from './styles'
const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const PROP_TYPES = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  mapLoaded: PropTypes.func,
}
class MapBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markerAngle: new Animated.Value(0),
    }
    this.animateMarker = this.animateMarker.bind(this)
    this.renderMap = this.renderMap.bind(this)
  }
  componentDidMount() {
    this.animateMarker()
  }
  animateMarker() {
    const self = this
    const {markerAngle} = this.state
    Animated.sequence([
      Animated.timing(markerAngle, {
        toValue: 1,
      }),
      Animated.timing(markerAngle, {
        toValue: 0,
      }),
      Animated.timing(markerAngle, {
        toValue: 1,
      }),
      Animated.timing(markerAngle, {
        toValue: 0,
      })
    ]).start(() => {
      self.animateMarker()
    })
  }
  getMarkerAnimatedStyles() {
    const {markerAngle} = this.state
    const spin = markerAngle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return {
      transform: [{
        'rotate': spin,
      }],
    }
  }
  renderMap() {
    const {latitude, longitude, mapLoaded} = this.props
    return (
      <View style={styles.mapContainer}>
        <Map
          width={width}
          height={height + 100}
          latitude={latitude}
          longitude={longitude}
          onLoad={mapLoaded}
        />
      </View>
    )
  }
  render() {
    const {latitude, longitude} = this.props
    return (
      <View style={styles.container}>
        {latitude && longitude ? this.renderMap() : null}
        <View style={styles.mapOverlayContainer}>
          <Img
            src={mapOverlay}
          />
          <View style={styles.mapControlsContainer}>
            <Animated.View style={[styles.userLocationMarkerContainer, this.getMarkerAnimatedStyles()]}>
              <Img
                src={userLocationMarker}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

export default MapBackground
