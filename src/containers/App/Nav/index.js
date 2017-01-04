import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'
import SCENES from '@constants/app-scenes'
import T from '@components/T'
import Icon from '@components/Icon'
import styles from './styles'
import {COLOR} from '@theme/colors'
import {SPRING} from '@theme/animations'

const PROP_TYPES = {
  currenSceneIndex: PropTypes.number,
}

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      buttonScale0: new Animated.Value(1.3),
      buttonScale1: new Animated.Value(1),
      buttonScale2: new Animated.Value(1),
      buttonTextOpacity0: new Animated.Value(1),
      buttonTextOpacity1: new Animated.Value(0),
      buttonTextOpacity2: new Animated.Value(0),
      buttonTextLeft0: new Animated.Value(35),
      buttonTextLeft1: new Animated.Value(30),
      buttonTextLeft2: new Animated.Value(30),
    }
    this.renderScenes = this.renderScenes.bind(this)
    this.getButtonStyles = this.getButtonStyles.bind(this)
    this.animateSelectedButton = this.animateSelectedButton.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSceneIndex !== this.props.currentSceneIndex) {
      this.animateSelectedButton(this.props.currentSceneIndex, nextProps.currentSceneIndex)
    }
  }
  animateSelectedButton(prevSceneIndex, nextSceneIndex) {
    const {scenes, currentSceneIndex} = this.props
    const prevSceneScale = this.state['buttonScale' + prevSceneIndex]
    const nextSceneScale = this.state['buttonScale' + nextSceneIndex]
    const prevSceneTextOpacity = this.state['buttonTextOpacity' + prevSceneIndex]
    const nextSceneTextOpacity = this.state['buttonTextOpacity' + nextSceneIndex]
    const prevSceneTextLeft = this.state['buttonTextLeft' + prevSceneIndex]
    const nextSceneTextLeft = this.state['buttonTextLeft' + nextSceneIndex]
    Animated.sequence([
      Animated.parallel([
        Animated.timing(prevSceneScale, {
          toValue: 1,
          ...SPRING.fast,
        }),
        Animated.timing(prevSceneTextOpacity, {
          toValue: 0,
          duration: 400,
        }),
        Animated.timing(prevSceneTextLeft, {
          toValue: 30,
          duration: 400,
        }),
      ]),
      Animated.parallel([
        Animated.spring(nextSceneScale, {
          toValue: 1.3,
          ...SPRING.fast,
        }),
        Animated.timing(nextSceneTextOpacity, {
          toValue: 1,
          duration: 300,
        }),
        Animated.timing(nextSceneTextLeft, {
          toValue: 35,
          duration: 500,
        }),
      ]),
    ]).start()

  }
  getButtonStyles(index) {
    const {currentSceneIndex} = this.props
    return {
      backgroundColor: currentSceneIndex === index ? COLOR.pink : COLOR.white,
    }
  }
  renderScenes() {
    const {scenes, currentSceneIndex} = this.props
    return scenes.map((scene, index) => {
      const buttonStyles = this.getButtonStyles(index)
      const animatedStyles = {
        transform:[{
          scale: this.state['buttonScale' + index],
        }]
      }
      const animatedNameStyles = {
        opacity: this.state['buttonTextOpacity' + index],
        left: this.state['buttonTextLeft' + index],
      }
      return (
        <Animated.View
          style={[
            styles.sceneNavButtonContainer,
            buttonStyles,
            animatedStyles,
          ]}
          key={index}
        >
          <Icon
            type={scene.icon}
            color={currentSceneIndex === index ? 'white' : 'pink'}
            size={'medium'}
          />

          <Animated.View
            style={[
              styles.sceneNameContainer,
              animatedNameStyles,
            ]}>
            <T
              color={'white'}
              size={'small'}
              weight={'semiBold'}>
              {scene.name}
            </T>
          </Animated.View>
        </Animated.View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lineCenter} />
        <View style={styles.sceneNavButtons}>
          {this.renderScenes()}
        </View>
      </View>
    )
  }
}

Nav.propTypes = PROP_TYPES

export default Nav
