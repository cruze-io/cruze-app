import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import T from '@components/T'
import Img from '@components/Img'
const locationIcon = require('@assets/images/icons/location.png')
import styles from './styles'

const PROP_TYPES = {
  copy: PropTypes.object,
}

class GettingLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {copy} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Img
              src={locationIcon}
            />
          </View>
          <T
            color={'white'}
            size={'large'}
            weight={'light'}
            styles={{
              letterSpacing: 1.2,
            }}
          >
            {copy.heading}
          </T>
          <View style={styles.borderBottom} />
          <T
            color={'white'}
            size={12}
            weight={'semiBold'}
          >
            {copy.subHeading}
          </T>
        </View>
      </View>
    )
  }
}

GettingLocation.propTypes = PROP_TYPES

export default GettingLocation
