import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import Icon from '@components/Icon'
import styles from './styles'

const PROP_TYPES = {

}

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Icon
          size={'xLarge'}
          type={'backArrow'}
          styles={styles.backArrow}
        />
      </View>
    )
  }
}

Nav.propTypes = PROP_TYPES

export default Nav
