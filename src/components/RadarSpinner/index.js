import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'
import T from '@components/T'
import Img from '@components/Img'
const radarSpinnerImage = require('@assets/images/loaders/radar-spinner.png')
import styles from './styles'

const PROP_TYPES = {

}

class RadarSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinnerAngle: new Animated.Value(0),
    }
    this.getAnimatedStyles = this.getAnimatedStyles.bind(this)
    this.startSpinAnimation = this.startSpinAnimation.bind(this)
  }
  componentDidMount() {
    this.startSpinAnimation()
  }
  startSpinAnimation() {
    const {spinnerAngle} = this.state
    Animated.sequence([
      Animated.timing(spinnerAngle, {
        toValue: 0,
        duration: 10,
      }),
      Animated.timing(spinnerAngle, {
        toValue: 1,
        duration: 100000,
      }),
    ]).start(() => {
      this.startSpinAnimation()
    })
  }
  getAnimatedStyles() {
    const {spinnerAngle} = this.state
    const spin = spinnerAngle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '50000deg']
    })
    return {
      transform: [{
        rotate: spin,
      }]
    }
  }
  render() {
    return (
      <Animated.View style={[styles.container, this.getAnimatedStyles()]}>
        <Img
          src={radarSpinnerImage}
        />
      </Animated.View>
    )
  }
}

RadarSpinner.propTypes = PROP_TYPES

export default RadarSpinner
