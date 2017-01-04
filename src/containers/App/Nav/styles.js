const containerDimensions = {
  width: 50,
  height: 160,
}

const center = {
  alignItems: 'center',
  justifyContent: 'center',
}

const styles = {
  container: {
    flex: 1,
    ...center,
  },
  lineCenter: {
    width: 2,
    height: 120,
    backgroundColor: 'rgba(250,250,250,0.2)',
  },
  sceneNavButtons: {
    position: 'absolute',
    top:0,
    left:0,
    width: containerDimensions.width,
    height: containerDimensions.height,
  },
  sceneNavButtonContainer: {
    position : 'relative',
    width: 30,
    height: 30,
    left: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginBottom: 25,
    ...center,
  },
  sceneNameContainer: {
    position:'absolute',
    top: 8,
    left: 35,
    height: 10,
    width: 100,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

export default styles
