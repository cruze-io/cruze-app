const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  container: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: 'red',
  },
  backgroundImageContainer: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  radarSpinnerContainer: {
    position: 'absolute',
    bottom: 30,
    width,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default styles
