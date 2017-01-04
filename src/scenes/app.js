import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import Auth from '@containers/Auth'
import App from '@containers/App'
import Routes from '@containers/Routes'

const scenes = Actions.create(
  <Scene key="main">
  	<Scene
  		key="auth"
  		component={Auth}
  		title="Auth"
  	/>
    <Scene
      key="app"
      component={App}
      title="App"
    />
    <Scene
      key="routes"
      component={Routes}
      title="Routes"
    />
  </Scene>
)

export default scenes
