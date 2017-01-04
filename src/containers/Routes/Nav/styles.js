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
    height: 80,
  },
  backArrow: {
    position: 'relative',
    top: 30,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0)'
  }
}

export default styles
