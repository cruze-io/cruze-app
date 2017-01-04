/* @flow */

import { StyleSheet } from 'react-native'
import { FONT_COLOR, FONT_SIZE, FONT_WEIGHT } from '@theme/fonts'

const styles = StyleSheet.create({
	container: {
		width: 130,
		height: 35,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 17.5
	},
	buttonText: {
		color: FONT_COLOR.secondary,
		fontWeight: FONT_WEIGHT.semiBold,
		fontSize: FONT_SIZE.small
	},
	iconContainer: {
		position: 'absolute',
		bottom: 1,
		width: 30,
		height: 30,
		left: 55,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},
})

export default styles
