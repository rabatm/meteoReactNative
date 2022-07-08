import { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default function WeatherLogo(props) {
    const [weatherlogo,setWeatherLogo]=useState(require('../assets/orage.png'))
    useEffect(() => {
      switch(String(props.main)) {
        case "Clear":
          setWeatherLogo(require('../assets/soleil.png'))
          break;
        case "Rain":
          setWeatherLogo(require('../assets/pluie.png'))
          break;
        case "Snow":
          setWeatherLogo(require('../assets/neige.png'))
          break;
        case "Rain":
          setWeatherLogo(require('../assets/pluie.png'))
          break;
        case "Clouds":
          setWeatherLogo(require('../assets/nuageu.png'))
          break;
        default:
          setWeatherLogo(require('../assets/pluieSoleil.png'))
      }

    })
  return (
            <Image
            style={styles.weatherlogo} 
            source={weatherlogo}/>
  );
}

const styles = StyleSheet.create({
  weatherlogo: {
    width:150,
    height:150,
  }
});