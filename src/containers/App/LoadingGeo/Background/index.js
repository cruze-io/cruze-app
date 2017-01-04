import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import T from '@components/T'
import RadarSpinner from '@components/RadarSpinner'
import Img from '@components/Img'
const gettingLocationBackground = require('@assets/images/backgrounds/getting-location-background.png')
import styles from './styles'

const PROP_TYPES = {

}

class Background extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  scrollEnd(e, swiperEvent) {

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundImageContainer}>
          <Img
            src={gettingLocationBackground}
          />
        </View>
        <View style={styles.radarSpinnerContainer}>
          <RadarSpinner />
        </View>
      </View>
    )
  }
}

Background.propTypes = PROP_TYPES

export default Background
