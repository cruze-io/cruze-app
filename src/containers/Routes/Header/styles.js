const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  container: {
    position: 'relative',
    width,
    height: 250,
    alignItems: 'center',
  },
  heading: {
    marginTop: 100,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  borderBottom: {
    marginTop: 20,
    width: 150,
    height: 1,
    backgroundColor: 'rgba(250,250,250,0.4)',
  },
  subHeading: {
    backgroundColor: 'rgba(250,250,250,0)',
    marginTop: 10,
  }
}

export default styles
