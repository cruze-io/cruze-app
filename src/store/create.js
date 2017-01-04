import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import reduxThunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'
import emailPassword from './modules/emailPassword'
import app from './modules/app'

const reducers = {
  emailPassword: emailPassword,
  app: app,
}

const enhancer = compose(
  applyMiddleware(
    reduxThunkMiddleware,
  )
)

export default function configureStore(initialState): Store {
  const reducer = combineReducers({...reducers})
  const state = Immutable.fromJS({})
  const store = reducer(state)
  return createStore(
    reducer,
    store,
    enhancer,
  )
}
