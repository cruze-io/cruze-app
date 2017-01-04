import React, {Component, PropTypes} from 'react'
import {View, Animated, TouchableOpacity} from 'react-native'
import Map from '@components/Map'
import Img from '@components/Img'
import T from '@components/T'
const routeInfoBackground = require('@assets/images/backgrounds/route-info-background.png')
const routeMediumButtonBackground = require('@assets/images/backgrounds/route-medium-button-background.png')
const routeMediumButtonGoBackground = require('@assets/images/backgrounds/route-medium-button-go-background.png')
const expandedDetailsBackground = require('@assets/images/backgrounds/expanded-details-background.png')
import {SPRING} from '@theme/animations'
import styles from './styles'

const PROP_TYPES = {
  route: PropTypes.object,
}

class RouteMedium extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
      containerHeight: new Animated.Value(180),
      mapLeft: new Animated.Value(-100),
      mapTop: new Animated.Value(-170),
      routeInfoOpacity: new Animated.Value(1),
      expandedDetailsLeft: new Animated.Value(-300),
      expandedDetailsOpacity: new Animated.Value(0),
      greenOverlayOpacity: new Animated.Value(0),
    }
    this.renderMap = this.renderMap.bind(this)
    this.renderRouteInfo = this.renderRouteInfo.bind(this)
    this.renderToggleButton = this.renderToggleButton.bind(this)
    this.expandRouteDetails = this.expandRouteDetails.bind(this)
    this.minimizeRouteDetails = this.minimizeRouteDetails.bind(this)
    this.getContainerAnimatedStyles = this.getContainerAnimatedStyles.bind(this)
    this.getAnimatedMapStyles = this.getAnimatedMapStyles.bind(this)
    this.getAnimatedExpandedOverlayStyles = this.getAnimatedExpandedOverlayStyles.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isExpanded) {
      this.expandRouteDetails()
    }
    if (!nextState.isExpanded) {
     this.minimizeRouteDetails()
    }
    return true
  }
  expandRouteDetails() {
    console.log("### Expand card")
    const {containerHeight, mapLeft, mapTop, routeInfoOpacity, expandedDetailsLeft, expandedDetailsOpacity, greenOverlayOpacity} = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.spring(containerHeight, {toValue: 280, ...SPRING.fast}),
        Animated.timing(mapLeft, {toValue: 0, duration: 400}),
        Animated.timing(mapTop, {toValue: -110, duration: 400}),
        Animated.timing(routeInfoOpacity, {toValue: 0, duration: 200}),
        Animated.timing(expandedDetailsLeft, {toValue: 0, duration: 400}),
        Animated.timing(expandedDetailsOpacity, {toValue: 1, duration: 400}),
        Animated.timing(greenOverlayOpacity, {toValue: 1, duration: 400}),
      ])
    ]).start()
  }
  minimizeRouteDetails() {
    console.log("### Minimze card")
    const {containerHeight, mapLeft, mapTop, routeInfoOpacity, expandedDetailsLeft, expandedDetailsOpacity, greenOverlayOpacity} = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.spring(containerHeight, {toValue: 180, ...SPRING.fast}),
        Animated.spring(mapLeft, {toValue: -100, ...SPRING.fast}),
        Animated.spring(mapTop, {toValue: -170, ...SPRING.fast}),
        Animated.spring(routeInfoOpacity, {toValue: 1, duration: 200}),
        Animated.timing(expandedDetailsLeft, {toValue: -300, duration: 400}),
        Animated.timing(expandedDetailsOpacity, {toValue: 0, duration: 400}),
        Animated.timing(greenOverlayOpacity, {toValue: 0, duration: 400}),
      ])
    ]).start()
  }
  getContainerAnimatedStyles() {
    const {containerHeight} = this.state
    return {
      height: containerHeight,
    }
  }
  getAnimatedMapStyles() {
    const {mapLeft, mapTop} = this.state
    return {
      left: mapLeft,
      top: mapTop,
    }
  }
  getAnimatedExpandedOverlayStyles() {
    const {expandedDetailsLeft, expandedDetailsOpacity} = this.state
    return {
      left: expandedDetailsLeft,
      opacity: expandedDetailsOpacity,
    }
  }
  renderMap() {
    const {route} = this.props
    return (
      <Animated.View style={[styles.mapContainer, this.getAnimatedMapStyles()]}>
        <Map
          path={route.waypoints.coordinates}
          width={500}
          height={420}
          zoom={9}
        />
      </Animated.View>
    )
  }
  renderRouteInfo() {
    const {route} = this.props
    const {routeInfoOpacity} = this.state
    return (
      <Animated.View style={[styles.routeInfoContainer, {opacity: routeInfoOpacity}]}>
        <View style={styles.routeInfo}>
          <T
            color={'black'}
            styles={{backgroundColor: 'rgba(0,0,0,0)', marginTop: 10, marginBottom: 5,}}
            size={14}
            weight={'semiBold'}
          >
            {route.name}
          </T>
          <T
            styles={styles.distance}
            size={11}
            weight={'semiBold'}
          >
            2
          </T>
          <T
            styles={styles.units}
            size={9}
            weight={'light'}
          >
            Miles Away
          </T>
        </View>
      </Animated.View>
    )
  }
  renderExpandedDetails() {
    const {route} = this.props
    return (
      <Animated.View style={[styles.expandedDetailsContainer, this.getAnimatedExpandedOverlayStyles()]}>
        <View style={styles.expandedDetailsBackgroundContainer}>
          <Img
            src={expandedDetailsBackground}
          />
        </View>
        <View style={styles.expandedDetails}>
          <T
            color={'black'}
            size={20}
            weight={'regular'}
            textAlign={'left'}
            styles={styles.routeHeading}
          >
            {route.name}
          </T>
          <T
            color={'black'}
            size={11}
            weight={'regular'}
            textAlign={'left'}
            styles={styles.routeSubHeading}
          >
            A nice drive through the mountains. You can see the sun rays flow through ...
          </T>
          <View style={styles.attrContainer}>
            <T
              size={'small'}
              color={'grey'}
              textAlign={'left'}
              weight={'medium'}
              styles={styles.attrHeading}
            >
              DISTANCE
            </T>
            <View style={styles.numberContainer}>
              <T
                size={'large'}
                color={'black'}
                weight={'bold'}
                textAlign={'left'}
              >
                2
              </T>
              <T
                size={'small'}
                color={'black'}
                weight={'light'}
                textAlign={'left'}
                styles={styles.unitsContainer}
              >
                Mi. Away
              </T>
            </View>
          </View>
          <View style={styles.attrContainer}>
            <T
              size={'small'}
              color={'grey'}
              textAlign={'left'}
              weight={'medium'}
              styles={styles.attrHeading}
            >
              DURATION
            </T>
            <View style={styles.numberContainer}>
              <T
                size={'large'}
                color={'black'}
                weight={'bold'}
                textAlign={'left'}
              >
                31
              </T>
              <T
                size={'small'}
                color={'black'}
                weight={'light'}
                textAlign={'left'}
                styles={styles.unitsContainer}
              >
                Mins.
              </T>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
  renderToggleButton() {
    const {isExpanded, greenOverlayOpacity} = this.state
    return (
      <TouchableOpacity
        style={styles.toggleButtonContainer}
        onPress={() => {
          this.setState({
            isExpanded: !isExpanded,
          })
        }}
      >
        <View style={styles.buttonBackgroundContainer}>
          <Img
            src={routeMediumButtonBackground}
          />
        </View>
        <Animated.View style={[styles.buttonBackgroundContainer, {opacity: greenOverlayOpacity}]}>
          <Img
            src={routeMediumButtonGoBackground}
          />
        </Animated.View>
        <View style={styles.toggleButtonText}>
          <T
            size={'regular'}
            styles={{backgroundColor: 'rgba(0,0,0,0)'}}
            color={'white'}
            weight={'medium'}
          >
            {isExpanded ? 'GO TO ROAD' : 'VIEW DETAILS'}
          </T>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <Animated.View style={[styles.container, this.getContainerAnimatedStyles()]}>
        {this.renderMap()}
        {this.renderRouteInfo()}
        {this.renderExpandedDetails()}
        {this.renderToggleButton()}
      </Animated.View>
    )
  }
}

RouteMedium.propTypes = PROP_TYPES

export default RouteMedium
