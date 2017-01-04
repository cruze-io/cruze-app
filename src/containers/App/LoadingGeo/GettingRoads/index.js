import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import T from '@components/T'
import Img from '@components/Img'
import Map from '@components/Map'
const roadsIcon = require('@assets/images/icons/roads.png')
import styles from './styles'

const PROP_TYPES = {
  copy: PropTypes.object,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onMapLoad: PropTypes.func,
}

class GettingRoads extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderMap = this.renderMap.bind(this)
  }
  renderMap() {
    const {latitude, longitude, onMapLoad} = this.props
    return (
      <Map
        width={240}
        height={70}
        latitude={latitude}
        longitude={longitude}
        onLoad={onMapLoad}
      />
    )
  }
  render() {
    const {copy, latitude, longitude} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Img
              src={roadsIcon}
            />
          </View>
          <T
            color={'white'}
            size={'large'}
            weight={'light'}
            styles={{
              letterSpacing: 1.2,
            }}
          >
            {copy.heading}
          </T>
          <View style={styles.borderBottom} />
          <T
            color={'white'}
            size={12}
            weight={'semiBold'}
          >
            {copy.successMessage}
          </T>
          <View style={styles.mapContainer}>
            {latitude && longitude ? this.renderMap() : null}
          </View>
          <T
            color={'white'}
            size={12}
            weight={'semiBold'}
          >
            {copy.loadingMessage}
          </T>
        </View>
      </View>
    )
  }
}

GettingRoads.propTypes = PROP_TYPES

export default GettingRoads
