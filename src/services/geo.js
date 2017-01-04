import {DeviceEventEmitter} from 'react-native'
const { RNLocation: Location } = require('NativeModules')

export const requestLocationAuthorization = () => {
  Location.requestWhenInUseAuthorization()
}

export const getAuthorizationStatus = (cb) => {
  Location.getAuthorizationStatus(cb)
}

export const setDesiredAccuracy = (meters) => {
  Location.setDesiredAccuracy(distanceInMeters)
}

export const setDistanceFilter = (meters) => {
  Location.setDistanceFilter(meters)
}

export const startUpdatingLocation = (cb) => {
  Location.startUpdatingLocation()
  DeviceEventEmitter.addListener('locationUpdated', cb)
}

export const stopUpdatingLocation = () => {
  Location.stopUpdatingLocation()
}

export default GEO = {
  requestLocationAuthorization: requestLocationAuthorization,
  getAuthorizationStatus: getAuthorizationStatus,
  setDesiredAccuracy: setDesiredAccuracy,
  setDistanceFilter: setDistanceFilter,
  startUpdatingLocation: startUpdatingLocation,
  stopUpdatingLocation: stopUpdatingLocation,
}
