const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const absoluteContainerStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width,
  height,
}

const styles = {
  container: {
    flex:1,
    backgroundColor: 'red',
  },
  mapContainer: {
    ...absoluteContainerStyles,
    backgroundColor: 'green',
  },
  scenesContainer: {
    ...absoluteContainerStyles,
  },
  navContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    height: 160,
    width: 50,
  },
}

export default styles
