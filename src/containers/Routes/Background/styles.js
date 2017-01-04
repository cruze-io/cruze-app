const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  }
}

export default styles
