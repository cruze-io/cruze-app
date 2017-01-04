import React, {Component, PropTypes} from 'react'
import {View, WebView} from 'react-native'
import T from '@components/T'
import Img from '@components/Img'
const roadsIcon = require('@assets/images/icons/roads.png')
import styles from './styles'
const prodUrl = 'https://intense-fjord-18642.herokuapp.com';

const PROP_TYPES = {
  copy: PropTypes.object,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onLoad: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.array,
  zoom: PropTypes.number,
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getWebViewUrl = this.getWebViewUrl.bind(this)
  }
  generateMarkers(path) {
    const iconUrl = 'http://s3.amazonaws.com/spotonit/images/other/marker-extra-small.png'
    const coordsStart = path[0][1] + ',' + path[0][0]
    const coordsEnd = path[path.length - 1][1] + ',' + path[path.length - 1][0]
    return '&markers=icon:' + iconUrl + '|' + coordsStart + '&markers=icon:' + iconUrl + '|' + coordsEnd
  }
  generatePathUrl(path, width, height, zoom) {
    let url = 'https://maps.googleapis.com/maps/api/staticmap'
    const sizeParams = '?size=' + width + 'x' + height
    const zoomParams = zoom ? '&zoom=' + zoom : '&zoom=10'
    let pathString = '&path=color:0xe74ffe|weight:3|'
    path.forEach((coords, index) => {
      pathString += coords[1] + ',' + coords[0] + (index !== path.length - 1 ? '|' : '')
    })
    const markersParams = this.generateMarkers(path)
    const keyParams = '&key=AIzaSyDKtzlprtCZG6DtLjl7_AIwS5OjtEe3iFo'
    return url + sizeParams + zoomParams + pathString + markersParams + keyParams + '&chode=true'
  }
  getWebViewUrl() {
    const {longitude, latitude, onLoad, width, height, path, zoom} = this.props
    const lonLatQueryParams = '&lat=' + latitude + '&lng=' + longitude
    if (!path) {
      return prodUrl + '/map?width=' + width + '&height=' + (height + 20) + lonLatQueryParams
    } else {
      return this.generatePathUrl(path, width, height, zoom)
    }
  }
  render() {
    const {copy, onLoad, width, height} = this.props
    const webViewUrl = this.getWebViewUrl()
    return (
      <View style={styles.container}>
        <WebView
          style={{height, width}}
          source={{uri: webViewUrl + '&sgdfsfdx=xy3wyrehsfd'}}
          javaScriptEnabled={true}
          onError={() => {console.log("#### Error occured")}}
          onLoad={onLoad}
        />
      </View>
    )
  }
}
// 70 240
Map.propTypes = PROP_TYPES

export default Map
