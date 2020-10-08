import Geolocation, { AuthorizationLevel, GeoCoordinates, GeoOptions, GeoWatchOptions, PositionError } from 'react-native-geolocation-service'
import { hasLocationPermission } from './utils'

/**
 * Get current position
 * @param options Options for get position
 * @param iosAuthorizationLevel Authorization level to request on iOS to user
 */
const getPosition: (options: GeoOptions, iosAuthorizationLevel: AuthorizationLevel) => Promise<GeoCoordinates> = (options, iosAuthorizationLevel) =>
    new Promise(async (resolve, reject) => {
        const canGetGeolocalization = await hasLocationPermission(Boolean(options.enableHighAccuracy), iosAuthorizationLevel)
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
        } else {
            reject({
                code: PositionError.PERMISSION_DENIED,
                message: "User didn't accept permissions."
            })
        }
    })

/**
 * Watch position updates
 * @param options Options for watch position
 * @param iosAuthorizationLevel Authorization level to request on iOS to user
 */
const watchPosition: (options: GeoWatchOptions, iosAuthorizationLevel: AuthorizationLevel) => Promise<GeoCoordinates> = (options, iosAuthorizationLevel) =>
    new Promise(async (resolve, reject) => {
        const canGetGeolocalization = await hasLocationPermission(Boolean(options.enableHighAccuracy), iosAuthorizationLevel)
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
        } else {
            reject({
                code: PositionError.PERMISSION_DENIED,
                message: "User didn't accept permissions."
            })
        }
    })

export { getPosition, watchPosition }
