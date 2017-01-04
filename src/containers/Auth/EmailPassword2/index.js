/* @flow */

import React, { Component, PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'
import ImmutablePropTypes from 'react-immutable-proptypes'
const shallowCompare = require('react-addons-shallow-compare')
import T from '@components/T'
import Input from '@components/Input'
import B from '@components/B'
import styles from './styles'

const PROP_TYPES = {
  setInputValue: PropTypes.func,
  setAuthType: PropTypes.func,
  inputBlurred: PropTypes.bool,
  toggleKeyboard: PropTypes.func,
  data: ImmutablePropTypes.map,
  authenticate: PropTypes.func,
}

class EmailPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticating: false,
    }
    this._renderConfirmPassword = this._renderConfirmPassword.bind(this)
    this._authenticate = this._authenticate.bind(this)
    this._validateForm = this._validateForm.bind(this)
  }

  componentDidMount() {
    const self = this
    setTimeout(() => {
      self.setState({
        authenticating: true,
      })
    }, 4000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _renderConfirmPassword() {
    const {data, inputBlurred, toggleKeyboard, setInputValue} = this.props
    if (data && data.get('authType') === 'signup') {
      return (
        <Input
          inputRef={'confirmPassword'}
          placeholder={'CONFIRM PASSWORD'}
          inputBlurred={inputBlurred}
          onFocus={() => toggleKeyboard(true)}
          onBlur={() => toggleKeyboard()}
          type={'confirmPassword'}
          password={data.get('password')}
          icon={'password'}
          onChange={(value, isValid) => {setInputValue('confirmPassword', value, isValid)}}
        />
      )
    } else {
      return null
    }
  }

  _validateForm(type) {
    const {data} = this.props
    const isEmailValid = data.get('emailValid')
    const isPasswordValid = data.get('passwordValid')
    const isConfirmPasswordValid = (type === 'signin') ? true : data.get('confirmPasswordValid')

    return (isEmailValid && isPasswordValid && isConfirmPasswordValid)
  }

  _authenticate() {
    const {data, authenticate} = this.props
    const type = data.get('authType')
    const isValid = this._validateForm(type)
    if (isValid) {
      authenticate(type, {
        email: data.get('email'),
        password: data.get('password'),
      })
    } else {
      console.log("#### ERROR")
    }

  }

  render() {
    const {data, inputBlurred, toggleKeyboard, setInputValue, setAuthType} = this.props

    return (
      <View style={styles.container}>
        <Input
          inputRef={'email'}
          placeholder={'EMAIL'}
          inputBlurred={inputBlurred}
          onFocus={() => toggleKeyboard(true)}
          onBlur={() => toggleKeyboard()}
          type={'email'}
          icon={'email'}
          onChange={(value, isValid) => {setInputValue('email', value, isValid)}}
        />
        <Input
          inputRef={'password'}
          placeholder={'PASSWORD'}
          inputBlurred={inputBlurred}
          onFocus={() => toggleKeyboard(true)}
          onBlur={() => toggleKeyboard()}
          type={'password'}
          icon={'password'}
          onChange={(value, isValid) => {setInputValue('password', value, isValid)}}
        />
        {this._renderConfirmPassword()}
        <View style={styles.buttonContainer}>
          <B
            type={'solid'}
            color={'secondary'}
            size={'regular'}
            text={data && data.get('authType') === 'signin' ? 'SIGN IN' : 'JOIN NOW'}
            style={{marginTop: 30}}
            loading={data && data.get('authenticating')}
            success={data && !data.get('authError') && data.get('authedUser')}
            error={data && !data.get('authedUser') && data.get('authError')}
            onPress={this._authenticate}
          />
        </View>
        <TouchableOpacity
          style={styles.authTypeContainer}
          onPress={() => setAuthType(data.get('authType') === 'signin' ? 'signup' : 'signin')}>
          <T
            color={'primary'}
            size={'regular'}
            weight={'semiBold'}>
              {data && data.get('authType') === 'signin' ? 'Don\'t have an account?' : 'Already have an account?'}
          </T>
          <T
            color={'primary'}
            size={'regular'}
            weight={'semiBold'}
            fontStyle={'italic'}
            styles={{
              marginLeft: 4,
            }}>
            {data && data.get('authType') === 'signin' ? 'Sign up' : 'Sign in'}
          </T>
        </TouchableOpacity>
      </View>
    )
  }
}

EmailPassword.propTypes = PROP_TYPES

export default EmailPassword
