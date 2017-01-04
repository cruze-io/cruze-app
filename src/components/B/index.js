/* @flow */

import React, { Component, PropTypes } from 'react'
import { View, Text, Platform, Animated, TouchableOpacity } from 'react-native'
import T from '../T'
import { COLOR } from '@theme/colors'
import { LOADER_TYPE, LOADER_SIZE } from '@theme/loaders'
import styles from './styles'
import { FONT_SIZE, FONT_COLOR, FONT_WEIGHT } from '@theme/fonts'
import { Buttons } from '@theme/buttons'
import Icon from 'react-native-vector-icons/Ionicons'

const PROP_TYPES = {
  size: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  buttonTextStyle: PropTypes.object,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  fontColor: PropTypes.string,
  fontStyle: PropTypes.string,
  onPress: PropTypes.func,
}

class B extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  getContainerStyles() {
    const {color, size} = this.props
    return {
      backgroundColor: COLOR[color] || color || COLOR['primary'],
      ...Buttons[size ? size : 'regular'],
    }
  }

  render() {
    const {children, fontColor, fontSize, fontStyle, fontWeight, onPress} = this.props
    return (
      <TouchableOpacity
        style={[styles.container, this.getContainerStyles()]}
        onPress={onPress}
      >
        <View>
          <T
            size={fontSize || 'regular'}
            color={fontColor || 'secondary'}
            weight={fontWeight || 'semiBold'}
            style={fontStyle || 'regular'}
          >
            {children}
          </T>
        </View>
      </TouchableOpacity>
    )
  }
}

B.propTypes = PROP_TYPES

export default B
