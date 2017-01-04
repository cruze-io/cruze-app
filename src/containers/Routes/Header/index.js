import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import T from '@components/T'
import styles from './styles'

const PROP_TYPES = {
  copy: PropTypes.object,
}

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {copy} = this.props
    return (
      <View style={styles.container}>
        <T
          size={28}
          weight={'bold'}
          color={'white'}
          styles={styles.heading}>
          {copy.heading}
        </T>
        <T
          size={12}
          weight={'medium'}
          color={'white'}
          styles={styles.subHeading}>
          {copy.subHeading}
        </T>
      </View>
    )
  }
}

Header.propTypes = PROP_TYPES

export default Header
