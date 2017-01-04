const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  brandingContainer: {
    paddingTop: 30,
    width: width,
    alignItems: 'center',
    flex: 2,
  },
  logoContainer: {
    position: 'relative',
    top: 8,
  },
  brandName: {
    letterSpacing: 3,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  seperator: {
    width: 100,
    height: 1,
    backgroundColor: 'rgba(250,250,250,0.15)',
    marginTop: 15,
  },
}

export default styles
