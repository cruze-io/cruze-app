import React, {Component, PropTypes} from 'react'
import {Animated, View, Image} from 'react-native'
import styles from './styles'

const PROP_TYPES = {
  uri: PropTypes.string,
  onLoad: PropTypes.func,
  customStyles: PropTypes.obj,
  backgroundSize: PropTypes.string,
}

class Img extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerOpacity: new Animated.Value(0),
    }
    this.animatedContainerStyles = this.animatedContainerStyles.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  animatedContainerStyles() {
    const {containerOpacity} = this.state
    return {
      opacity: 1,
    }
  }

  onLoad() {
    const {containerOpacity} = this.state
    const {onLoad} = this.props
    Animated.timing(containerOpacity, {
      toValue: 1,
    }).start()

    if (onLoad) {
      onLoad()
    }
  }

  render() {
    const {uri, src, customStyles, customImageStyles, backgroundSize} = this.props
    return (
      <Animated.View style={[styles.container]}>
        <Image
          source={uri ? {uri: src} : src}
          style={[styles.image, customImageStyles]}
          onLoad={this.onLoad}
          resizeMode={backgroundSize || 'contain'}
        />
      </Animated.View>
    )
  }
}

export default Img
