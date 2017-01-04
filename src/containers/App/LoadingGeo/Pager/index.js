import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'
import SLIDES from '@constants/getting-location-slides'
import T from '@components/T'
import Img from '@components/Img'
const pagerRing = require('@assets/images/other/pager-ring.png')
import styles from './styles'

const PROP_TYPES = {
  currentSlide: PropTypes.number,
}

class Pager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outerRingScale: new Animated.Value(0),
      outerRingOpacity: new Animated.Value(0),
      outerMidRingScale: new Animated.Value(0),
      outerMidRingOpacity: new Animated.Value(0),
      midRingScale: new Animated.Value(0),
      midRingOpacity: new Animated.Value(0),
      innerRingScale: new Animated.Value(0),
      innerRingOpacity: new Animated.Value(0),
      activeDotTop: new Animated.Value(5),
    }
    this.getAnimatedStyles = this.getAnimatedStyles.bind(this)
    this.slideChangedAnimation = this.slideChangedAnimation.bind(this)
    this.getActiveDotTopStyles = this.getActiveDotTopStyles.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSlide === 1) {
      this.slideChangedAnimation(1)
    }
    if (nextProps.currentSlide === 2) {
      this.slideChangedAnimation(2)
    }
  }
  componentDidMount() {
    this.slideChangedAnimation()
  }
  scrollEnd(e, swiperEvent) {

  }
  slideChangedAnimation(index) {
    const {outerRingScale, outerRingOpacity, outerMidRingScale, outerMidRingOpacity, midRingScale, midRingOpacity, innerRingScale, innerRingOpacity, activeDotTop}  = this.state
    let topValue = 5
    if (index === 1) {
      topValue = 50
    }
    if (index === 2) {
      topValue = 100
    }
    Animated.sequence([
      Animated.parallel([
        Animated.timing(activeDotTop, {
          toValue: topValue,
          duration: 200,
        }),
        Animated.parallel([
          Animated.timing(innerRingScale, {
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(innerRingOpacity, {
            toValue: 0,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(midRingScale, {
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(midRingOpacity, {
            toValue: 0,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(outerMidRingScale, {
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(outerMidRingOpacity, {
            toValue: 0,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(outerRingScale, {
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(outerRingOpacity, {
            toValue: 0,
            duration: 300,
          }),
        ])
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(innerRingScale, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(innerRingOpacity, {
            toValue: 1,
            duration: 1000,
          }),
        ]),
        Animated.parallel([
          Animated.timing(midRingScale, {
            toValue: 1,
            duration: 500,
          }),
          Animated.timing(midRingOpacity, {
            toValue: 1,
            duration: 1000,
          }),
        ]),
        Animated.parallel([
          Animated.timing(outerMidRingScale, {
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(outerMidRingOpacity, {
            toValue: 1,
            duration: 1000,
          }),
        ]),
        Animated.parallel([
          Animated.timing(outerRingScale, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(outerRingOpacity, {
            toValue: 1,
            duration: 1500,
          }),
        ])
      ])
    ]).start()
  }
  getAnimatedStyles(stateKey) {
    const animatedScaleState = this.state[stateKey + 'Scale']
    const animatedOpacityState = this.state[stateKey + 'Opacity']
    return {
      transform: [{
        scale: animatedScaleState,
        opacity: animatedOpacityState,
      }]
    }
  }
  getActiveDotTopStyles() {
    const {activeDotTop} = this.state
    return {
      top: activeDotTop,
    }
  }
  renderDots() {
    return SLIDES.map((slide, index) => {
      return (
        <View
          style={styles.dotContaine}
          key={index}
        />
      )
    })
  }
  renderActiveDot() {
    return (
      <Animated.View style={[styles.activeDotContainer, this.getActiveDotTopStyles()]}>
        <Animated.View style={[styles.outerRing, this.getAnimatedStyles('outerRing')]} />
        <Animated.View style={[styles.outerMidRing, this.getAnimatedStyles('outerMidRing')]} />
        <Animated.View style={[styles.midRing, this.getAnimatedStyles('midRing')]} />
        <Animated.View style={[styles.innerRing, this.getAnimatedStyles('innerRing')]} />
        <View style={styles.filledDot} />
      </Animated.View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderDots()}
        {this.renderActiveDot()}
      </View>
    )
  }
}

Pager.propTypes = PROP_TYPES

export default Pager
