import React, { Component, PropTypes } from 'react'
import {View} from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
const shallowCompare = require('react-addons-shallow-compare')
import { setInputValue, setAuthType, authenticate } from '@store/modules/emailPassword'
import Background from './Background'
import Branding from './Branding'
import OAuth from './OAuth'
import EmailPassword from './EmailPassword'
import styles from './styles'

const PROP_TYPES = {
  dispatch: PropTypes.func,
  emailPassword: ImmutablePropTypes.map,
}

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidMount() {
    Actions.app({
      account: {}
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.emailPassword.get('authenticating')) {
    } else if (nextProps.emailPassword.get('authedUser')) {
      Actions.app({
        account: nextProps.emailPassword.get('authedUser')
      })
    }
  }

  render() {
    const {dispatch, emailPassword} = this.props
    return (
      <View style={styles.container}>
        <Background />
        <Branding />
        <OAuth />
        <EmailPassword
          authType={emailPassword.get('authType')}
          setInputValue={(key, value) => dispatch(setInputValue(key, value, true))}
          setAuthType={() => {dispatch(setAuthType())}}
          authenticate={() => {dispatch(authenticate())}}
          emailPassword={emailPassword}
        />
      </View>
    )
  }
}

Auth.propType = PROP_TYPES

const mapStateToProps = (state) => ({
  emailPassword: state.get('emailPassword'),
})

export default connect(mapStateToProps)(Auth)
