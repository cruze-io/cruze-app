/* @flow */

import React, { Component, PropTypes } from 'react'
import { View, TextInput, Platform, Animated, TouchableWithoutFeedback } from 'react-native'
const shallowCompare = require('react-addons-shallow-compare')
import { Validate } from '@utils/validate'
import Container from '@components/Container'
import T from '@components/T'
import { COLOR } from '@theme/colors'
import styles from './styles'
import { FONT_COLOR } from '@theme/fonts'
import { LINEAR, SPRING } from '@theme/animations'
import Icon from 'react-native-vector-icons/Ionicons'
const Dimensions = require('Dimensions')
const {
  width,
  height
} = Dimensions.get('window')

const PROP_TYPES = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputBlurred: PropTypes.bool,
  password: PropTypes.string,
}

class Input extends Component<void, Props, void> {
	props: Props

  constructor(props) {
    super(props)
    this.state = {
      placeholderPositionTop: new Animated.Value(48),
      placeholderPositionLeft: new Animated.Value(50),
      placeholderOpacity: new Animated.Value(0.7),
      placeholderScale: new Animated.Value(1),
      hasValue: false,
      isValid: false,
      successIconScale: new Animated.Value(0),
      errorIconScale: new Animated.Value(0),
    }
    this._inputFocused = this._inputFocused.bind(this)
    this._blurInput = this._blurInput.bind(this)
    this._togglePlaceHolder = this._togglePlaceHolder.bind(this)
    this._validate = this._validate.bind(this)
    this._getKeyboardType = this._getKeyboardType.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.inputBlurred) {
        this._blurInput()
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _inputFocused() {
    this._togglePlaceHolder(true)
    this.refs[this.props.inputRef].focus()
    this.props.onFocus()
  }

  _blurInput() {
    this.refs[this.props.inputRef].blur()
    if (!this.state.hasValue) {
      this._togglePlaceHolder()
    }
    this.props.onBlur()
  }

  _onChange(value) {
    if (value) {
      this.setState({hasValue: true})
    } else {
      this.setState({hasValue: false})
    }
    this._validate(value)
  }

  _togglePlaceHolder(isFocused) {
    const toValues = {
      opacity: isFocused ? 1 : 0.7,
      scale: isFocused ? 0.8 : 1,
      top: isFocused ? 18 : 48,
      left: isFocused ? -10 : 50,
    }
    const {placeholderOpacity, placeholderPositionTop, placeholderPositionLeft, placeholderScale} = this.state
    const increasePlaceHolderOpacity = Animated.timing(placeholderOpacity, {toValue: toValues.opacity, ...LINEAR.fast})
    const decreasePlaceHolderScale = Animated.timing(placeholderScale, {toValue: toValues.scale, ...LINEAR.fast})
    const changePlaceholderTopPosition = Animated.spring(placeholderPositionTop, {toValue: toValues.top, ...SPRING.fast})
    const changePlaceholderLeftPosition = Animated.spring(placeholderPositionLeft, {toValue: toValues.left, ...SPRING.fast})
    Animated.sequence([
      Animated.parallel([
        increasePlaceHolderOpacity,
        decreasePlaceHolderScale,
        changePlaceholderTopPosition,
        changePlaceholderLeftPosition,
      ])
    ]).start()
  }

  _placeHoldeIcon(icon) {
    let iconName = ''
    let iconBottomPosition = ''
    const iconPrefix = Platform.OS === 'ios' ? 'ios-' : 'md-'
    switch(icon) {
      case 'email':
        iconName = iconPrefix + 'mail'
        iconBottomPosition = Platform.OS === 'ios' ? 2 : 0
        iconSize = Platform.OS === 'ios' ? 17 : 13
        break
      case 'password':
        iconName = iconPrefix + 'lock'
        iconBottomPosition = Platform.OS === 'ios' ? 5 : 1
        iconSize = Platform.OS === 'ios' ? 17 : 14
        break
      case 'name':
        iconName = iconPrefix + 'person'
        iconBottomPosition = Platform.OS === 'ios' ? 5 : 1
        iconSize = Platform.OS === 'ios' ? 20 : 15
        break
      case 'username':
        iconName = iconPrefix + 'person'
        iconBottomPosition = Platform.OS === 'ios' ? 5 : 1
        iconSize = Platform.OS === 'ios' ? 20 : 15
        break
      case 'phone':
        iconName = iconPrefix + 'call'
        iconBottomPosition = Platform.OS === 'ios' ? 5 : 1
        iconSize = Platform.OS === 'ios' ? 20 : 15
        break
    }

    return {
      iconName: iconName,
      iconBottomPosition: iconBottomPosition,
      iconSize: iconSize,
    }
  }
  _renderPlaceHolderIcon() {
    const { icon } = this.props
    const placeholderIcon = this._placeHoldeIcon(icon)
    if (icon) {
      return (
        <Icon
          name={placeholderIcon.iconName}
          size={placeholderIcon.iconSize}
          color={FONT_COLOR.primary}
          style={[styles.placeholderIcon, {
            bottom: placeholderIcon.iconBottomPosition,
          }]}
        />
      )
    } else {
      return null
    }
  }

  _renderPlaceHolder(placeholder) {
    const {placeholderOpacity, placeholderPositionTop, placeholderPositionLeft, placeholderScale} = this.state
    const placeHolderIcon = this._renderPlaceHolderIcon()
    return (
      <TouchableWithoutFeedback onPress={() => this._inputFocused()}>
        <Animated.View
          style={[
            styles.placeholderContainer, {
              opacity:placeholderOpacity,
              top: placeholderPositionTop,
              left: placeholderPositionLeft,
              transform: [{
                scale: placeholderScale,
              }],
            }
          ]}>
          {placeHolderIcon}
          <T
            style={styles.placeholder}
            size={'small'}
            color={'primary'}
            weight={'bold'}>
            {placeholder}
          </T>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  _validate(value) {
    const type = this.props.type || 'none'
    let isValid = false
    switch(type) {
      case 'none':
        isValid = true
        break
      case 'confirmPassword':
        isValid = (this.props.password === value)
        break
      case 'username':
        const self = this
        if (value && !value.indexOf(' ') >= 0) {
          const usernameValidation = Validate.username(value)
          if (usernameValidation.then) {
            usernameValidation.then((valid) => {
              this.setState({isValid: valid})
              self.props.onChange(value, valid)
              self._toggleIconVisiblity()
            })
          } else {
            isValid = false
          }
        } else {
          isValid = false
        }
        break
      default:
        isValid = Validate[type](value)
    }
    this.setState({isValid: isValid})
    if (this.props.onChange) {
      this.props.onChange(value, isValid)
    }
    setTimeout(() => {
      this._toggleIconVisiblity()
    }, 100)
  }

  _toggleIconVisiblity() {
    const {hasValue, isValid, successIconScale, errorIconScale} = this.state
    const toValues = {
      success: {
        scale: isValid ? 1 : 0,
      },
      error: {
        scale: !isValid ? 1 : 0,
      }
    }
    if (!hasValue) {
      toValues.success.scale = 0
      toValues.error.scale = 0
    }
    const animateSuccessIcon = Animated.spring(successIconScale, {toValue: toValues.success.scale, ...SPRING})
    const animateErrorIcon = Animated.spring(errorIconScale, {toValue: toValues.error.scale, ...SPRING})
    Animated.parallel([
      animateSuccessIcon,
      animateErrorIcon,
    ]).start()
  }

  _getKeyboardType() {
    const { type } = this.props
    switch(type) {
      case 'email':
        return 'email-address'
      case 'phone':
        return 'phone-pad'
      default:
        return 'default'
    }
  }

  render() {
    const {placeholder, style, inputRef, type} = this.props
    const {successIconScale, errorIconScale} = this.state
    const iosStyles = Platform.OS === 'ios' ? {left: ((width / 2) - (width - 100) / 2)} : {}
    const iconPrefix = Platform.OS === 'ios' ? 'ios-' : 'md-'
    const keyboardType = this._getKeyboardType()
    return (
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <Animated.View
            transition={['opacity', 'transform']}
            style={[styles.icon, {
              opacity: successIconScale,
              transform: [{
                scale: successIconScale,
              }]
            }]}>
            <Icon
              name={iconPrefix + 'checkmark-circle-outline'}
              size={20}
              color={COLOR.success}
            />
          </Animated.View>
          <Animated.View
            transition={['opacity', 'transform']}
            style={[styles.icon, {
              opacity: errorIconScale,
              transform: [{
                scale: errorIconScale,
              }]
            }]}>
            <Icon
              name={iconPrefix + 'close-circle'}
              size={20}
              color={COLOR.error}
            />
          </Animated.View>
        </View>
        <View style={styles.inputBorderBottom}></View>
        <TextInput
          ref={inputRef}
          style={[styles.input, style, iosStyles]}
          onChangeText={(value) => this._onChange(value)}
          onFocus={() => this._inputFocused()}
          secureTextEntry={(type === 'password' || type === 'confirmPassword')}
          autoCapitalize={'none'}
        />
        {placeholder ? this._renderPlaceHolder(placeholder) : null}
      </View>
    )
  }
}

Input.propTypes = PROP_TYPES

export default Input
