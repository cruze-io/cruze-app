import React, {Component, PropTypes} from 'react'
import styles from './styles'
import {View, Image} from 'react-native'
const backgroundImage = require('@assets/images/backgrounds/auth-background-2.png')

const Background = (props:PROP_TYPES) => {
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
      />
    </View>
  )
}

export default Background
