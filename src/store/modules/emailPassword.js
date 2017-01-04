import { List, Map, fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { Auth } from '@services/auth'
import VALIDATE from '@helpers/validate'
const SET_VALUE = 'SET_VALUE'
const SET_PASSWORD_VALUE = 'SET_PASSWORD_VALUE'
const SET_CONFIRM_PASSWORD_VALUE = 'SET_CONFIRM_PASSWORD_VALUE'
const SET_AUTH_TYPE = 'SET_AUTH_TYPE'
const AUTHENTICATING = 'AUTHENTICATING'
const AUTHED_SUCCESSFULLY = 'AUTHED_SUCCESSFULLY'
const AUTH_ERROR = 'AUTH_ERROR'

const initialState = fromJS({
  email: '',
  emailValid: false,
  password: '',
  passwordValid: false,
  confirmPassword: '',
  confirmPasswordValid: false,
  authType: 'signup',
  authenticating: false,
  authedUser: null,
  authError: null,
})

export default createReducer(initialState, {
  [SET_VALUE]: (state, action) =>  state.merge({
    ...action.payload,
  }),
  [SET_AUTH_TYPE]: (state, action) => state.merge({
    authType: action.payload,
  }),
  [AUTHENTICATING]: (state, action) => state.merge({
    authenticating: true,
    authError: false,
    authedUser: null,
  }),
  [AUTHED_SUCCESSFULLY]: (state, action) => state.merge({
    authenticating: false,
    authError: false,
    authedUser: action.payload,
  }),
  [AUTH_ERROR]: (state, action) => state.merge({
    authenticating: false,
    authError: action.payload,
    authedUser: null,
  }),
})

export const setInputValue = (field, value) => {
  return (dispatch, getState) => {
    const isValid = VALIDATE[field] ? VALIDATE[field](value, getState().get('emailPassword').get('confirmPassword')) : true
    const isValidKey = field + 'Valid'
    const uppercase = field.toUpperCase()
    let payload = {}
    payload[field] = value
    payload[isValidKey] = isValid
    dispatch({
      type: SET_VALUE,
      payload: payload,
    })
  }
}

export const setAuthType = (type) => {
  return (dispatch, getState) => {
    const authType = getState().get('emailPassword').get('authType') === 'signin' ? 'signup' : 'signin'
    dispatch({
      type: SET_AUTH_TYPE,
      payload: authType,
    })
  }
}

export const authenticate = () => {
  return (dispatch, getState) => {
    const type = getState().get('emailPassword').get('authType')
    const account = {
      username: getState().get('emailPassword').get('email'),
      email: getState().get('emailPassword').get('email'),
      password: getState().get('emailPassword').get('password'),
    }
    dispatch({
      type: AUTHENTICATING
    })
    Auth[type](account).then((response) => {
      console.log(response)
      setTimeout(() => {
        dispatch({
          type: !response.auth ? AUTH_ERROR : AUTHED_SUCCESSFULLY,
          payload: response.message || response.auth,
        })
      }, 2000)
    })
  }
}
