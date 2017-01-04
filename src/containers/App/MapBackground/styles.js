const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')
import {COLOR} from '@theme/colors'

const styles = {
  container: {
    flex: 1,
  },
  mapOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  mapControlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLocationMarkerContainer: {
    width: 100,
    height: 100,
  },
  mapContainer: {
    position: 'absolute',
    width,
    height: height + 300,
    top: -150,
    left: 0,
  }

}

export default styles
