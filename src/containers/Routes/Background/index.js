import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import Img from '@components/Img'
const routesBackground = require('@assets/images/backgrounds/routes-background.png')
import styles from './styles'

const PROP_TYPES = {

}

class Background extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Img
          src={routesBackground}
        />
      </View>
    )
  }
}

Background.propTypes = PROP_TYPES

export default Background
