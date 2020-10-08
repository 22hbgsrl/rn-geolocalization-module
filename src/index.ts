import Geolocation, { AuthorizationLevel, GeoCoordinates, GeoOptions, GeoWatchOptions } from 'react-native-geolocation-service'
import { hasLocationPermission } from './utils'

/**
 * Get current position
 * @param options Options for get position
 * @param iosAuthorizationLevel Authorization level to request on iOS to user
 */
const getPosition: (options: GeoOptions, iosAuthorizationLevel: AuthorizationLevel) => Promise<GeoCoordinates> = (options, iosAuthorizationLevel) =>
    new Promise((resolve, reject) => {
        const canGetGeolocalization = hasLocationPermission(Boolean(options.enableHighAccuracy), iosAuthorizationLevel)
        if (canGetGeolocalization) {
            Geolocation.getCurrentPosition(
                async (position) => {
                    resolve(position.coords)
                },
                async (error) => {
                    reject(error)
                },
                options
            )
        }
    })

/**
 * Watch position updates
 * @param options Options for watch position
 * @param iosAuthorizationLevel Authorization level to request on iOS to user
 */
const watchPosition: (options: GeoWatchOptions, iosAuthorizationLevel: AuthorizationLevel) => Promise<GeoCoordinates> = (options, iosAuthorizationLevel) =>
    new Promise((resolve, reject) => {
        const canGetGeolocalization = hasLocationPermission(Boolean(options.enableHighAccuracy), iosAuthorizationLevel)
        if (canGetGeolocalization) {
            Geolocation.watchPosition(
                async (position) => {
                    resolve(position.coords)
                },
                async (error) => {
                    reject(error)
                },
                options
            )
        }
    })

export { getPosition, watchPosition }
