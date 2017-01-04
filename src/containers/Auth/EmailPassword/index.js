import React, {Component, PropTypes} from 'react'
import {View, TouchableOpacity, Animated} from 'react-native'
import Input from '@components/Input'
import T from '@components/T'
import B from '@components/B'
import COPY from '@constants/copy'
import {SPRING} from '@theme/animations'
import styles from './styles'

const PROP_TYPES = {
  setInputValue: PropTypes.func,
  setAuthType: PropTypes.func,
  authenticate: PropTypes.func,
}

class EmailPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerTop: new Animated.Value(-50),
      containerOpacity: new Animated.Value(0),
    }
    this.showContainer = this.showContainer.bind(this)
  }

  componentDidMount() {
    const self = this
    setTimeout(() => {
      self.showContainer()
    }, 400)
  }

  showContainer() {
    const {containerTop, containerOpacity} = this.state
    Animated.parallel([
      Animated.spring(containerTop, {
        toValue: 0,
        ...SPRING.fast,
      }),
      Animated.timing(containerOpacity, {
        toValue: 1,
      }),
    ]).start()
  }

  render() {
    const {emailPassword, authType, setAuthType, setInputValue, authenticate} = this.props
    const {containerTop, containerOpacity} = this.state
    const confirmPasswordValid = emailPassword.get('confirmPassword') === emailPassword.get('password')

    return (
      <Animated.View style={[styles.container, {
        top: containerTop,
        opacity: containerOpacity,
      }]}>
        <View style={styles.inputContainer}>
          <Input
            id={'email'}
            placeholder={'EMAIL'}
            icon={'email'}
            onChange={setInputValue}
            isValid={emailPassword.get('emailValid')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            id={'password'}
            placeholder={'PASSWORD'}
            icon={'lock'}
            onChange={setInputValue}
            isValid={emailPassword.get('passwordValid')}
          />
        </View>
        {authType === 'signup' ?
          <View style={styles.inputContainer}>
            <Input
              id={'confirmPassword'}
              placeholder={'CONFIRM PASSWORD'}
              icon={'lock'}
              onChange={setInputValue}
              isValid={confirmPasswordValid}
            />
          </View> : null
        }
        <View style={styles.authButtonContainer}>
          <B
            color={'white'}
            size={'regular'}
            type={'solid'}
            onPress={() => {
              if (emailPassword.get('emailValid') && emailPassword.get('passwordValid') && confirmPasswordValid) {
                authenticate()
              }
            }}>
            {COPY.auth['authButton-' + authType]}
          </B>
        </View>
        <TouchableOpacity
          onPress={setAuthType}
          style={styles.toggleAuthTypeContainer}>
          <T
            color={'primary'}
            size={'regular'}
            weight={'medium'}>
            {authType === 'signup' ? COPY.auth['toggleAuth-signin'] : COPY.auth['toggleAuth-signup']}
          </T>
          <T
            color={'primary'}
            size={'regular'}
            weight={'medium'}
            fontStyle={'italic'}
            styles={styles.toggleAuthText}
            >
            {COPY.auth['authButtonText-' + authType]}
          </T>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

EmailPassword.propTypes = PROP_TYPES

export default EmailPassword
