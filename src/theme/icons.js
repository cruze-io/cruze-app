/**
 * Ionicons
 * Icon documentation
 * https://ionicframework.com/docs/v2/ionicons/
 */

import {Platform} from 'react-native'
const prefix = Platform === 'ios' ? 'ios-' : 'md-'


const ICONS = {
  email: prefix + 'mail',
  lock: prefix + 'lock',
  checkMark: prefix + 'checkmark-circle-outline',
  cross: prefix + 'close-circle',
  backArrow: 'ios-arrow-round-back',
  account: prefix + 'person',
  search: prefix + 'search',
  power: prefix + 'power',
}

export default ICONS
