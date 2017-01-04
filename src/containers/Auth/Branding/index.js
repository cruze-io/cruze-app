import React, {Component, PropTypes} from 'react'
import {View, Image, Animated} from 'react-native'
import COPY from '@constants/copy'
import T from '@components/T'
import Logo from '@components/Logo'
import styles from './styles'
import {SPRING} from '@theme/animations'

const PROP_TYPES = {
}

class Branding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerOpacity: new Animated.Value(0),
      containerTop: new Animated.Value(-50),
    }
  }

  componentDidMount() {
    this.showContainer()
  }

  showContainer() {
    const {containerOpacity, containerTop} = this.state
    Animated.parallel([
      Animated.timing(containerOpacity, {
        toValue: 1,
      }),
      Animated.spring(containerTop, {
        toValue: 0,
        ...SPRING.fast,
      }),
    ]).start()
  }

  render() {
    const {containerOpacity, containerTop} = this.state
    const copy = COPY.auth
    const animatedStyles = {opacity: containerOpacity, top: containerTop}
    return (
      <Animated.View style={[styles.brandingContainer, animatedStyles]}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        {/* Heading */}
        <T
          color={'primary'}
          size={'medium'}
          weight={'light'}
          styles={{
            letterSpacing: 3,
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop: 15,
          }}
        >
        {copy.heading}
        </T>

        {/* Sub Heading */}
        <View
          style={styles.seperator}
        />
        <T
          color={'primary'}
          size={'regular'}
          weight={'medium'}
          styles={{
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop: 15,
          }}
        >
        {copy.subHeading}
        </T>
      </Animated.View>
    )
  }
}

Branding.propTypes = PROP_TYPES

export default Branding

