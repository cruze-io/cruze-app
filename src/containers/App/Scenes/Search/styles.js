const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')
import {COLOR} from '@theme/colors'

const styles = {
  container: {
    width,
    height,
  },
  mapControlsContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routesContainer: {
    flex: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  firstTileStyles: {
    marginLeft: 50,
    width: 200,
  },
  placeHolderRoute: {
    width: 200,
    height: 200,
    marginRight: 5,
    marginLeft: 5,
  },
  route: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
  },
  iconStyles: {
    position: 'absolute',
    left: -55,
    top: 70,
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

export default styles
