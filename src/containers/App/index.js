import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import { setScene, setStateValue, routesAroundLocation, locationUpdated } from '@store/modules/app'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import COPY from '@constants/copy'
import GEO from '@services/geo'
import SCENES from '@constants/app-scenes'
import T from '@components/T'
import MapBackground from './MapBackground'
import Scenes from './Scenes'
import Nav from './Nav'
import LoadingGeo from './LoadingGeo'
import styles from './styles'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.geoInit = this.geoInit.bind(this)
    this.locationUpdated = this.locationUpdated.bind(this)
    this.mapLoaded = this.mapLoaded.bind(this)
    this.routePressed = this.routePressed.bind(this)
  }
  componentDidMount() {
    this.geoInit()
    // Actions.routes({
    //   route: null,
    //   routes: [{"_id":"5861b47d9c0a1e00041be3be","createdBy":"5855f0df3041a100049590ef","distance":14.9,"name":"La Honda","waypoints":{"type":"LineString","coordinates":[[-122.265078,37.386298],[-122.263018,37.371862],[-122.264263,37.35346],[-122.274212,37.325588],[-122.297606,37.318216],[-122.345934,37.325451],[-122.399655,37.324509]]},"__v":0,"updated":"2016-12-27T00:23:25.311Z","created":"2016-12-27T00:23:25.311Z"},{"_id":"586434836f043800045603cd","createdBy":"5855f0df3041a100049590ef","distance":5.8,"name":"Page Mill","waypoints":{"type":"LineString","coordinates":[[-122.187127,37.314976],[-122.172337,37.328649],[-122.176403,37.341462],[-122.170196,37.360805]]},"__v":0,"updated":"2016-12-28T21:54:11.715Z","created":"2016-12-28T21:54:11.715Z"},{"_id":"5861b4509c0a1e00041be3bd","createdBy":"5855f0df3041a100049590ef","distance":6.8,"name":"SR 9","waypoints":{"type":"LineString","coordinates":[[-122.038032,37.255442],[-122.058304,37.252385],[-122.093318,37.257927],[-122.121441,37.258593]]},"__v":0,"updated":"2016-12-27T00:22:40.319Z","created":"2016-12-27T00:22:40.319Z"}],
    // })
  }
  geoInit() {
    const {dispatch} = this.props
    GEO.requestLocationAuthorization()
    GEO.getAuthorizationStatus((response) => {
      if (response === 'authorizedWhenInUse') {
        GEO.setDistanceFilter(20)
        GEO.startUpdatingLocation(this.locationUpdated)
        GEO.requestLocationAuthorization()
      } else {
        dispatch(setValue({
          geoError: true,
          geoErrorMessage: 'PLEASE ENABLE GEO FOR CRUZE IN YOUR SETTINGS,'
        }))
      }
    })
  }
  locationUpdated(loc) {
    const {dispatch, latitude, longitude} = this.props
    if (latitude !== loc.coords.latitude && longitude !== loc.coords.longitude) {
      dispatch(locationUpdated(loc.coords.latitude, loc.coords.longitude, loc.coords.speed, loc.coords.altitude, loc.coords.course, loc.coords.timestanmp))
      dispatch(routesAroundLocation(loc.coords.latitude, loc.coords.longitude))
    }
  }
  mapLoaded() {
    const {dispatch} = this.props
    dispatch(setStateValue({
      bigMapLoaded: true,
    }))
  }
  routePressed(route) {
    console.log("#### ROUTE WAS PRESSED")
    console.log(route)
    const {app} = this.props
    Actions.routes({
      route: route,
      routes: app.get('routes').toJS(),
    })
  }
  render() {
    const {app, dispatch} = this.props
    const loading = app.get('loadingApp') || app.get('loadingGeo') || app.get('loadingRoutes')
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapBackground
            latitude={app.get('latitude')}
            longitude={app.get('longitude')}
            mapLoaded={this.mapLoaded}
          />
        </View>
        <View style={styles.scenesContainer}>
          <Scenes
            scenes={SCENES}
            setScene={(index) => {
              let scene = SCENES[index]
              scene.index = index
              dispatch(setScene(scene))
            }}
            latitude={app.get('latitude')}
            longitude={app.get('longitude')}
            routes={app.get('routes')}
            routePressed={this.routePressed}
          />
        </View>
        <View style={styles.navContainer}>
          <Nav
            scenes={SCENES}
            currentSceneIndex={app.get('currentSceneIndex')}
          />
        </View>
        <LoadingGeo
          copy={COPY.app.loadingGeo}
          routesLoaded={app.get('routesLoaded')}
          latitude={app.get('latitude')}
          longitude={app.get('longitude')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  app: state.get('app'),
})

export default connect(mapStateToProps)(App)
