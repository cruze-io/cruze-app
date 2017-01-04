const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const styles = {
  container: {
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  mapContainer: {
    position: 'absolute',
    top: -170,
    left: -100,
    width: 500,
    height: 400,
    backgroundColor: 'green',
  },
  toggleButtonContainer: {
    position: 'absolute',
    bottom:-4,
    left: 0,
    width: 300,
    height: 32,
  },
  routeInfoContainer: {
    position: 'absolute',
    bottom: 28,
    width: 300,
    height: 60,
    backgroundColor: 'rgba(250,250,250,1)',
  },
  routeInfo: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    height: 55,
  },
  distance: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    bottom: 11,
    left: 0,
  },
  units: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    bottom: 12,
    left: 10,
    width: 50,
  },
  expandedDetailsContainer: {
    position: 'absolute',
    width: 300,
    height: 280,
    top: 0,
    left: 0,
  },
  expandedDetailsBackgroundContainer: {
    position: 'absolute',
    width: 300,
    height: 280,
    top: 0,
    left: 0,
  },
  expandedDetails: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 180,
    height: 280,
    paddingLeft: 20,
  },
  routeHeading: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  routeSubHeading: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  attrContainer: {
    marginTop: 18,
    width: 200,
  },
  attrHeading: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 5,
  },
  numberContainer: {
    flexDirection: 'row',
    width: 50,
  },
  unitsContainer: {
    position: 'relative',
    marginLeft: 5,
    top: 12,
  },
  buttonBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: 30,
    opacity: 0.8,
  },
  toggleButtonText: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default styles
