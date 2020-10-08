import Geolocation, { AuthorizationLevel } from 'react-native-geolocation-service'
import { PermissionsAndroid, Platform } from 'react-native'

const hasLocationPermissionIOS: (iosAuthorizationLevel: AuthorizationLevel) => Promise<boolean> = async (iosAuthorizationLevel) => {
    const status = await Geolocation.requestAuthorization(iosAuthorizationLevel)

    return status === 'granted'
}

export const hasLocationPermission: (isHighAccuracy: boolean, iosAuthorizationLevel: AuthorizationLevel) => Promise<boolean> = async (
    isHighAccuracy,
    iosAuthorizationLevel
) => {
    if (Platform.OS === 'ios') {
        return await hasLocationPermissionIOS(iosAuthorizationLevel)
    }

    const hasPermission = await PermissionsAndroid.check(
        isHighAccuracy ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    )

    if (hasPermission) {
        return true
    }

    const status = await PermissionsAndroid.request(
        isHighAccuracy ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true
    }

    return false
}
