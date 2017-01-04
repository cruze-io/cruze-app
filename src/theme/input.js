import {FONT_SIZE, FONT_COLOR} from '@theme/fonts'
const Dimensions = require('Dimensions')
const {
  width,
  height,
} = Dimensions.get('window')

const inputWidth = width - 140

const INPUT = {
  containerWidth: width,
  inputWidth: inputWidth,
  inputHeight: 50,
  placeholderWidth: inputWidth - 30,
  placeholderHeight: 20,
  borderBottomHeight: 1,
  fontSize: FONT_SIZE['regular'],
  fontColor: FONT_COLOR['primary'],
}

export default INPUT
