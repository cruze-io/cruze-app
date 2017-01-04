import React, {Component, PropTypes} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {View} from 'react-native'
import Swiper from 'react-native-swiper'
import T from '@components/T'
import Search from './Search'
import styles from './styles'

const PROP_TYPES = {
  setScene: PropTypes.func,
  routes: ImmutablePropTypes.list,
  routePressed: PropTypes.func,
}
class Scenes extends Component {
  constructor(props) {
    super(props)
    this.scrollEnd = this.scrollEnd.bind(this)
  }
  scrollEnd(e, swiperEvent) {
    const {setScene} = this.props
    setScene(swiperEvent.index)
  }
  render() {
    const {routes, routePressed} = this.props
    return (
      <Swiper
        horizontal={false}
        showsButtons={false}
        renderPagination={() => null}
        onMomentumScrollEnd={this.scrollEnd}>
        <View style={[styles.sceneContainer, styles.one]}>
          <Search
            routes={routes}
            routePressed={routePressed}
          />
        </View>
        <View style={[styles.sceneContainer, styles.two]}>
        </View>
        <View style={[styles.sceneContainer, styles.three]}>
        </View>
      </Swiper>
    )
  }
}

Scenes.propTypes = PROP_TYPES

export default Scenes
