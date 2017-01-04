import React, {Component, PropTypes} from 'react'
import styles from './styles'
import {View, TouchableWithoutFeedback, Animated} from 'react-native'
import {SPRING} from '@theme/animations'
import OAuthButton from '@components/OAuthButton'

const PROP_TYPES = {
  facebookAuth: PropTypes.func,
  googleAuth: PropTypes.func,
}

class OAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      containerTop: new Animated.Value(-50),
      containerOpacity: new Animated.Value(0),
    }
    this.showContainer = this.showContainer.bind(this)
  }

  componentDidMount() {
    const self = this
    setTimeout(() => {
      self.showContainer()
    }, 200)
  }

  showContainer() {
    const {containerTop, containerOpacity} = this.state
    Animated.parallel([
      Animated.spring(containerTop, {
        toValue: 0,
        ...SPRING.fast,
      }),
      Animated.timing(containerOpacity, {
        toValue: 1,
      }),
    ]).start()
  }

  render() {
    const {containerTop, containerOpacity} = this.state
    return (
      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.container, {
            top: containerTop,
            opacity: containerOpacity,
          }]}>
          <OAuthButton
            type={'facebook'}
            onPress={() => {console.log("#### O Auth button pressed")}}
            style={{margin: 5}}
          />
          <OAuthButton
            type={'google'}
            onPress={() => {console.log("#### O Auth button pressed")}}
            style={{margin: 5}}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

OAuth.propTypes = PROP_TYPES

export default OAuth
