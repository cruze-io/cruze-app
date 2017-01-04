import { List, Map, fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import {Routes} from '@services/routes'
const SET_SCENE = 'SET_SCENE'
const SET_VALUE = 'SET_VALUE'
const LOCATION_UPDATED = 'LOCATION_UPDATED'
const FETCHING_ROUTES = 'FETCHING_ROUTES'
const FETCHED_ROUTES = 'FETCHED_ROUTES'

const initialState = fromJS({
  loadingGeo: true,
  loadingApp: true,
  geoError: false,
  geoErrorMessage: null,
  latitude: null,
  longitude: null,
  radius: 15,
  bigMapLoaded: false,
  loadingRoutes: true,
  routes: List(),
  currentSceneIndex: 0,
  currenSceneName: 'Search',
})

export default createReducer(initialState, {
  [SET_SCENE]: (state, action) =>  state.merge({
    ...action.payload,
  }),
  [SET_VALUE]: (state, action) => state.merge({
    ...action.payload,
  }),
  [LOCATION_UPDATED]: (state, action) => state.merge({
    ...action.payload,
    geoError: false,
    geoErrorMessage: null,
    loadingGeo: false,
  }),
  [FETCHING_ROUTES]: (state, action) => state.merge({
    loadingRoutes: true,
  }),
  [FETCHED_ROUTES]: (state, action) => state.merge({
    loadingRoutes: false,
    routes: action.payload,
  }),
})

export const setScene = (scene) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SCENE,
      payload: {
        currentSceneIndex: scene.index,
        currentSceneName: scene.name,
      },
    })
  }
}

export const setStateValue = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SCENE,
      payload: data,
    })
  }
}

export const locationUpdated = (latitude, longitude, speed, altitude, course, timestamp) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOCATION_UPDATED,
      payload: {latitude, longitude, speed, altitude, course, locationLastUpdated: timestamp,},
    })
  }
}

export const routesAroundLocation = (latitude, longitude) => {
  return (dispatch, getState) => {
    const radius = getState().get('app').get('radius')
    dispatch({
      type: FETCHING_ROUTES,
    })
    const fetchRoutes = Routes.aroundLocation(latitude, longitude, radius).then((response) => {
      dispatch({
        type: FETCHED_ROUTES,
        payload: response,
      })
    })
  }
}
