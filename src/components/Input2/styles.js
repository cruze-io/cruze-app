/* @flow */

import { StyleSheet } from 'react-native'
import { COLOR } from '@theme/colors'
import { FONT_COLOR, FONT_SIZE } from '@theme/fonts'
const Dimensions = require('Dimensions')
const {
  width,
} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 70,
    alignItems: 'center',
  },
  inputBorderBottom: {
  	position: 'absolute',
  	left: (width / 2) - ((width - 90) / 2),
  	width: width - 100,
  	bottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  input: {
  	width: width - 80,
  	position: 'relative',
  	top: 20,
  	color: FONT_COLOR.primary,
  	fontSize: FONT_SIZE.regular,
  	height: 50,
  	textDecorationLine: 'none',
  	backgroundColor: 'rgba(0,0,0,0)',
  },
  placeholderContainer: {
  	width: width,
  	height: 40,
  	alignItems: 'flex-start',
  	position: 'absolute',
  	backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
  },
  placeholderIcon: {
    marginRight: 7,
    position: 'relative',
  },
  placeholder: {
  	position: 'relative',
  	textAlign: 'left',
  	justifyContent: 'center',
  	backgroundColor: 'rgba(0,0,0,0)',
    height: 20,
  },
  iconsContainer: {
  	position: 'absolute',
  	bottom: 0,
  	left:(width / 2) - ((width - 100) / 2),
  	width: width - 100,
  	height: 50,
  },
  icon: {
  	position: 'absolute',
  	top: 25,
  	right:5,
  	backgroundColor: 'rgba(0,0,0,0)',
  },
})

export default styles
