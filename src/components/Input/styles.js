import INPUT from '@theme/input'

const styles = {
  container: {
    width: INPUT.containerWidth,
    height: INPUT.inputHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    height: INPUT.inputHeight,
    width: INPUT.inputWidth,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: INPUT.inputWidth,
    backgroundColor: '#FFFFFF',
    height: INPUT.borderBottomHeight,
  },
  placeholderContainer: {
    position: 'absolute',
    width: INPUT.placeholderWidth,
    height: INPUT.placeholderHeight,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  placeholderText: {
    left: 10,
    top: 1,
    backgroundColor: 'rgba(0,0,0,0)',

  },
  placeholderIcon: {
    position: 'relative',
    top: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  inputContainer: {
    position: 'absolute',
    top: 3,
    left: 0,
    width: INPUT.inputWidth,
    height: INPUT.inputHeight,
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: INPUT.inputWidth,
    height: INPUT.inputHeight - 15,
    fontSize: INPUT.fontSize,
    color: INPUT.fontColor,
  },
  validityIconContainer: {
    position: 'absolute',
    top: 27,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

export default styles
