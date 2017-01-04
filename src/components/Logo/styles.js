const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const center = {
    alignItems: 'center',
    justifyContent: 'center',
}

const styles = {
  container: {
    position: 'relative',
    ...center,
  },
  ringsContainer: {
    ...center,
    transform: [{
      scale: 0.6,
    }]
  },
  ringContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    ...center,
  },
  dialContainer: {
    position: 'relative',
    top: 3,
    width: 45,
    height: 45,
    borderRadius: 45,
    ...center,
  },
  dial: {
    position: 'relative',
    bottom: 7,
    transform: [{
      scale: 0.7,
    }]
  },
  dialKnob: {
    position: 'absolute',
    top: 19,
    left: 19,
    bottom: 0,
    right:0,
    width: 7,
    height: 7,
    backgroundColor: 'white',
    borderRadius: 8,
  }
}

export default styles
