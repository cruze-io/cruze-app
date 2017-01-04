const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    width,
    height,
    backgroundColor: 'red',
  },
  slideContainer: {
    width,
    height,
  },
  pagerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width,
    height,
  }
}

export default styles
