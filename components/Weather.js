import { useEffect, useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import WeatherLogo from './WeatherLogo';
 
export default function Weather(props) {
  const [meteo,setMeteo]= useState({
    villeName:'',
    temp:0,
    vent:0,
    desc:''
  })
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const GetFromApi = (v) => {
    const apiKey ='850f27fce52c74a592c8106cd088d0a6';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=${apiKey}&units=metric&lang=fr`)
          .then((res) => res.json())
          .then((m) => {
             setMeteo(
               {
                 villeName: m.name,
                 temp: m.main.temp,
                 vent: m.wind.speed,
                 desc: m.weather[0].description,
                 main: m.weather[0].main
               }
            )
          })
          .catch((error) => {
            console.log(error);
          });
    }
  useEffect(() => {
    GetFromApi(props.v);
  },[props.v]);
   return (
        <View style={styles.weatherView}>
            <Text style={styles.weatherTile}>{new Date().toLocaleDateString("fr-CA",options)}</Text>
            <Text>voici la météo de {meteo.villeName}</Text>
            <WeatherLogo style={styles.logo} main={meteo.main}/>
            <Text style={styles.weatherTile} >
                {meteo.desc}
            </Text>
            <View style={styles.weatherInfos}>
              <Text style={styles.weatherInfo}>🌡️  {meteo.temp}°c</Text>
              <Text style={styles.weatherInfo}>💨  {meteo.vent} Km/h</Text>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  weatherView : {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',

  },
  weatherTile: {
    fontSize:30
  },
  weatherInfos: {
    paddingTop:20
  },
  weatherInfo: {
    fontSize:25,
    paddingTop:20
  },
});