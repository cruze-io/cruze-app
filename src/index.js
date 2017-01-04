import React from 'react'
import { Provider } from 'react-redux'
import createStore from '@store/create'
import Router from '@scenes'

const CruzApp = () => (
  <Provider store={createStore()}>
    <Router />
  </Provider>
)

export default CruzApp
