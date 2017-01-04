import React, {Component, PropTypes} from 'react'
import {View, Animated, TextInput} from 'react-native'
import T from '../T'
import Icon from '../Icon'
import {SPRING} from '@theme/animations'
import {COLOR} from '@theme/colors'
import styles from './styles'

const PROP_TYPES = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  isValid: PropTypes.bool,
}

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholderTop: new Animated.Value(25),
      placeholderLeft: new Animated.Value(0),
      placeholderOpacity: new Animated.Value(0.4),
      placeholderScale: new Animated.Value(1),
      value: null,
    }

    this.placeholderAnimation = this.placeholderAnimation.bind(this)
    this.renderPlaceholder = this.renderPlaceholder.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.getPlaceholderAnimatedStyles = this.getPlaceholderAnimatedStyles.bind(this)
  }

  placeholderAnimation(isMinimized) {
    const {placeholderTop, placeholderLeft, placeholderOpacity, placeholderScale} = this.state
    const toValues = {
      top: isMinimized ? 5 : 25,
      left: isMinimized ? -40 : 0,
      opacity: isMinimized ? 1 : 0.4,
      scale: isMinimized ? 0.85 : 1,
    }
    Animated.parallel([
      Animated.spring(placeholderTop, { toValue: toValues.top, ...SPRING.fast }),
      Animated.spring(placeholderLeft, { toValue: toValues.left, ...SPRING.fast }),
      Animated.timing(placeholderOpacity, { toValue: toValues.opacity }),
      Animated.timing(placeholderScale, { toValue: toValues.scale }),
    ]).start()
  }

  onChange(e) {
    const {onChange, id} = this.props
    const value = e.nativeEvent.text
    if (onChange) {
      onChange(id, value)
    }
    this.setState({value})

  }

  onFocus() {
    const {onFocus} = this.props
    if (onFocus) {
      onFocus()
    }
    this.placeholderAnimation(true)
  }

  onBlur() {
    const {onBlur, id} = this.props
    const {value} = this.state
    if (onBlur) {
      onBlur()
    }
    if (!value) {
      this.placeholderAnimation(false)
    }
  }

  getPlaceholderAnimatedStyles() {
    const {placeholderTop, placeholderLeft, placeholderOpacity, placeholderScale} = this.state

    return {
      opacity: placeholderOpacity,
      top: placeholderTop,
      left: placeholderLeft,
      transform: [{
        'scale': placeholderScale,
      }],
    }
  }

  renderPlaceholder() {
    const {placeholder, icon, id} = this.props
    return (
      <Animated.View style={[styles.placeholderContainer, this.getPlaceholderAnimatedStyles()]}>
        <Icon
          type={icon || 'email'}
          styles={styles.placeholderIcon}
          size={'regular'}
        />
        <T
          size={'small'}
          color={'primary'}
          weight={'semiBold'}
          styles={styles.placeholderText}
        >
          {placeholder}
        </T>
      </Animated.View>
    )
  }

  renderInput() {
    const {id} = this.props
    return (
      <View style={styles.inputContainer}>
        <TextInput
          ref={id}
          key={id}
          style={styles.textInput}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          secureTextEntry={id === 'password' || id === 'confirmPassword'}
        />
      </View>
    )
  }

  renderValidityIcon() {
    const {isValid} = this.props
    return (
      <View style={styles.validityIconContainer}>
        <Icon
          type={isValid ? 'checkMark' : 'cross'}
          styles={styles.validityIcon}
          size={'medium'}
          color={isValid ? 'success' : 'error'}
        />
      </View>
    )
  }

  render() {
    const {value} = this.state
    return (
      <View style={[styles.container]}>
        <View style={styles.innerContainer}>
          <View style={styles.borderBottom}/>
          {this.renderPlaceholder()}
          {this.renderInput()}
          {value ? this.renderValidityIcon() : null}
        </View>
      </View>
    )
  }
}

Input.propTypes = PROP_TYPES

export default Input
