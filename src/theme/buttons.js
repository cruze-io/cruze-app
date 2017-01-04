/**
 * The main buttons
 **/

// Dimensions
const Dimensions = require('Dimensions')
const {
  width,
  height,
} = Dimensions.get('window')

export const SMALL_BUTTON = {
  width: 100,
  height: 25,
  borderRadius: 25,
}

export const REGULAR_BUTTON = {
  width: 170,
  height: 35,
  borderRadius: 35,
}

export const LARGE_BUTTON = {
  width: 200,
  height: 45,
  borderRadius: 45,
}

export const X_LARGE_BUTTON = {
  width: width,
  height: 45,
  borderRadius: 45,
}

export const Buttons = {
	small: SMALL_BUTTON,
	regular: REGULAR_BUTTON,
	large: LARGE_BUTTON,
	xLarge: X_LARGE_BUTTON,
}


