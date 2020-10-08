# Geolocalization module

React Native module with geolocalization

## Installation

```sh
yarn add @22hbg/rn-geolocalization-module react-native-geolocation-service

cd ios/ && pod install
```

### Additional steps:

[Android setup](https://github.com/Agontuk/react-native-geolocation-service#2-permissions)\
[iOS setup](https://github.com/Agontuk/react-native-geolocation-service#3-update-infoplist)

## Usage

### Get current position

```javascript
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { getPosition } from '@22hbg/rn-geolocalization-module'
import { GeoCoordinates } from 'react-native-geolocation-service'

export default App = () => {
    const [position, setPosition] = useState<GeoCoordinates>(null)

    useEffect(() => {
        getInitialPosition()
    })

    const getInitialPosition = async () => {
        try {
            const coords = await getPosition(
                {
                    enableHighAccuracy: false
                },
                'whenInUse'
            )

            setPosition(coords)
        } catch (e) {
            console.log('error')
        }
    }

    return <Text>{`Lat. ${coords.latitude} Lng. ${coords.longitude}`}</Text>
}

export default App
```