/* @flow */

/**
 * Global styles
 **/
import { StyleSheet } from 'react-native'
const Dimensions = require('Dimensions')
const {
  width,
  height,
} = Dimensions.get('window')

// Container Style
export const CONTAINER = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
}