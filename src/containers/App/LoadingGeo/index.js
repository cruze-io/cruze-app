import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'
import Swiper from 'react-native-swiper'
import Background from './Background'
import Pager from './Pager'
import GettingLocation from './GettingLocation'
import GettingRoads from './GettingRoads'
import GeoSuccess from './GeoSuccess'
import styles from './styles'
const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const PROP_TYPES = {
  copy: PropTypes.object,
  routesLoaded: PropTypes.array,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
}

class LoadingGeo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerTop: new Animated.Value(0),
      currentSlide: 0,
    }
    this.mapLoaded = this.mapLoaded.bind(this)
    this.hideGeoLoading = this.hideGeoLoading.bind(this)
    this.getAnimatedStyles = this.getAnimatedStyles.bind(this)
    this.sliderMoving = true
  }
  componentDidMount() {
    // this.hideGeoLoading()
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.routesLoaded && !this.sliderMoving) {
      this.hideGeoLoading()
    }
  }
  hideGeoLoading() {
    const {containerTop} = this.state
    setTimeout(() => {
      Animated.timing(containerTop, {
        toValue: height * 2,
        duration: 300,
      }).start()
    }, 2000)
  }
  scrollEnd(e, swiperEvent) {

  }
  mapLoaded() {
    console.log("### MPA LOADED")
    const self = this
    const loadingGeoSwiper = this.refs.loadingGeoSwiper
    setTimeout(() => {
      this.setState({currentSlide: 1})
      loadingGeoSwiper.scrollBy(1,1)
    }, 2000)
    setTimeout(() => {
      this.setState({currentSlide: 2})
      loadingGeoSwiper.scrollBy(1,1)
      this.sliderMoving = false
      this.hideGeoLoading()
    }, 4500)
  }
  getAnimatedStyles() {
    const {containerTop} = this.state
    return {
      top: containerTop,
    }
  }
  render() {
    const {copy,latitude, longitude} = this.props
    const {currentSlide} = this.state
    return (
      <Animated.View style={[styles.container, this.getAnimatedStyles()]}>
        <Background />
        <View style={styles.pagerContainer}>
          <Pager
            currentSlide={currentSlide}
          />
        </View>
        <Swiper
          ref={'loadingGeoSwiper'}
          scrollEnabled={true}
          showsButtons={false}
          renderPagination={() => null}
          onMomentumScrollEnd={this.scrollEnd}>
          <View style={[styles.slideContainer, styles.one]}>
            <GettingLocation
              copy={copy.gettingLocation}
            />
          </View>
          <View style={[styles.slideContainer, styles.two]}>
            <GettingRoads
              copy={copy.gettingRoads}
              latitude={latitude}
              longitude={longitude}
              onMapLoad={this.mapLoaded}
            />
          </View>
          <View style={[styles.slideContainer, styles.three]}>
            <GeoSuccess
              copy={copy.geoSuccess}
            />
          </View>
        </Swiper>
      </Animated.View>
    )
  }
}

LoadingGeo.propTypes = PROP_TYPES

export default LoadingGeo
