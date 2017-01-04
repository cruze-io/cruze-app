/* @flow */

import { StyleSheet } from 'react-native'
import { COLOR } from '@theme/colors'
const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
  emailPasswordContainer: {
    flex: 3,
  }
})

export default styles
