import React, {Component, PropTypes} from 'react'
import {View, Image, Animated} from 'react-native'
const logo = require('@assets/images/logos/logo.png')
const dial = require('@assets/images/logo/dial.png')
const ringsImages = {
  ring3: require('@assets/images/logo/ring-1.png'),
  ring2: require('@assets/images/logo/ring-2.png'),
  ring1: require('@assets/images/logo/ring-3.png'),
  ring0: require('@assets/images/logo/ring-4.png'),
}
import styles from './styles'

const PROP_TYPES = {
  isAnimated: PropTypes.bool,
}

class Logo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rings: [ringsImages.ring3, ringsImages.ring2, ringsImages.ring1, ringsImages.ring0],
      width: 90,
      height: 90,
      dialAngle: new Animated.Value(0),
      ring0: new Animated.Value(0),
      ring1: new Animated.Value(0),
      ring2: new Animated.Value(0),
      ring3: new Animated.Value(0),
    }
    this.logoStyles = this.logoStyles.bind(this)
    this.renderRing = this.renderRing.bind(this)
    this.renderRings = this.renderRings.bind(this)
    this.renderDial = this.renderDial.bind(this)
  }

  componentDidMount() {
    this.animateDial()
    this.animateRing(0)
    this.animateRing(1)
    this.animateRing(2)
    this.animateRing(3)
  }

  logoStyles() {
    const {width, height} = this.state
    return {
      width: width,
      height: height,
    }
  }

  renderRing(ring, index) {
    const {width, height} = this.state
    const imageUrl = ringsImages['ring' + index]
    const spin = this.state['ring' + index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.View
        ref={'ring-' + index}
        key={'ring-' + index}
        style={[
          styles.ringContainer,
          {
            width,
            height,
            transform:[{
              'rotate': spin,
            }]
          }
        ]}
      >
        <Image
          source={imageUrl}
          style={[{width, height}, {
            transform: [{
              scale: 1.5 - (index * 0.1),
            }]
          }]}
          resizeMode={'center'}
        />
      </Animated.View>
    )
  }

  renderRings() {
    const {rings} = this.state
    return rings.map(this.renderRing)
  }

  renderDial() {
    const {dialAngle} = this.state
    const spin = dialAngle.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6],
      outputRange: ['0deg', '60deg', '50deg', '70deg', '40deg', '80deg', '0deg']
    })
    return (
      <Animated.View
        style={[styles.dialContainer, {
          transform: [{
            'rotate': spin,
          }]}
        ]}>
        <Image
          source={dial}
          style={[styles.dial]}
        />
        <View
          style={styles.dialKnob}
        />
      </Animated.View>
    )
  }

  animateDial() {
    const {dialAngle} = this.state
    const self = this
    Animated.sequence([
      Animated.timing(dialAngle, {
        toValue: 0,
      }),
      Animated.timing(dialAngle, {
        toValue: 1,
      }),
      Animated.timing(dialAngle, {
        toValue: 2,
      }),
      Animated.timing(dialAngle, {
        toValue: 3,
      }),
      Animated.timing(dialAngle, {
        toValue: 4,
      }),
      Animated.timing(dialAngle, {
        toValue: 5,
      }),
      Animated.timing(dialAngle, {
        toValue: 6,
      }),
    ]).start(() => {
      self.animateDial()
    })
  }

  animateRing(index) {
    const ringToAnimate = this.state['ring' + index]
    const animationDuration = 2000 + (index * 500)
    Animated.sequence([
      Animated.timing(ringToAnimate, {
        toValue: 0,
        duration: animationDuration,
      }),
      Animated.timing(ringToAnimate, {
        toValue: 1,
        duration: animationDuration,
      }),
      Animated.timing(ringToAnimate, {
        toValue: 0,
        duration: animationDuration,
      }),
    ]).start(() => {
      this.animateRing(index)
    })
  }

  render() {
    const {width, height} = this.state
    return (
      <View style={[styles.container, this.logoStyles()]}>
        <View style={[styles.ringsContainer, {width, height}]}>
          {this.renderRings()}
          {this.renderDial()}
        </View>
      </View>
    )
  }
}

Logo.propTypes = PROP_TYPES

export default Logo
