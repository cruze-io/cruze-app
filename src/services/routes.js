import {apiUrl} from '@config/api'

export const Routes = {

  aroundLocation(latitude, longitude, radius) {
        const woodsideLng = '-122.227648'
        const woodsideLat = '37.447353'
        const lngParams = '?long=' + woodsideLng
        const latParams = '&lat=' + woodsideLat
        const radiusParams = '&radius=' + radius
        const url = apiUrl + 'route/aroundLocation' + lngParams + latParams + radiusParams
        const getRoutesNearBy = fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((jsonString) => jsonString.json())
        return getRoutesNearBy
  },
}
