import Geolocation, { AuthorizationLevel } from 'react-native-geolocation-service'
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'

const hasLocationPermissionIOS: (iosAuthorizationLevel: AuthorizationLevel) => Promise<boolean> = async (iosAuthorizationLevel) => {
    const openSetting: () => void = () => {
        Linking.openSettings().catch(() => {
            Alert.alert('Impossibile aprire le impostazioni')
        })
    }
    const status = await Geolocation.requestAuthorization(iosAuthorizationLevel)

    if (status === 'granted') {
        return true
    }

    if (status === 'denied') {
        Alert.alert(
            `Accesso alla posizione`,
            "Consentendo l'accesso alla posizione, non la invierai a noi, ma verrà utilizzata all'interno dell'app per riprodurre lo stesso flusso FM della zona in cui ti trovi evitando di ascoltare spot di altre zone.",
            [{ text: 'Apri le impostazioni', onPress: openSetting }]
        )
    }

    if (status === 'disabled') {
        Alert.alert(
            `Accesso alla posizione`,
            "Consentendo l'accesso alla posizione, non la invierai a noi, ma verrà utilizzata all'interno dell'app per riprodurre lo stesso flusso FM della zona in cui ti trovi evitando di ascoltare spot di altre zone.",
            [{ text: 'Apri le impostazioni', onPress: openSetting }]
        )
    }

    return false
}

export const hasLocationPermission: (isHighAccuracy: boolean, iosAuthorizationLevel: AuthorizationLevel) => Promise<boolean> = async (
    isHighAccuracy,
    iosAuthorizationLevel
) => {
    if (Platform.OS === 'ios') {
        return await hasLocationPermissionIOS(iosAuthorizationLevel)
    }

    if (Platform.Version < 23) {
        return true
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

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    }

    return false
}
