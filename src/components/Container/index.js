/* @flow */

import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

type Props = {
  children: string,
  style: PropTypes.object
}

const Container = (props: Props) => {
  const { children, onPress, style } = props
  return (
    <View style={[styles.container, style]}>
    	{children}
    </View>
  )
}

export default Container
