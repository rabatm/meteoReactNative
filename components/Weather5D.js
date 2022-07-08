import { useEffect, useState } from 'react';
import { StyleSheet, View,Text,ScrollView } from 'react-native';
import WeatherLogo from './WeatherLogo';
 
export default function Weather5D (props) {
  const [meteo,setMeteo]= useState([{'date':'','meteo':[{
    'time': '','temp':'','vent':'','desc':'','main': ''
  }]}])
  const [ville,setVille]= useState(props.v)

  const formatDate = (d) => {
    const options = { weekday: 'short',  month: 'short', day: 'numeric'};
    let [year, month, day] = d.split('-');

    day= day.split(" ")[0]
    
    return new Date(+year, +month - 1, +day).toLocaleDateString("fr-CA",options);
  }

  const options = { weekday: 'short',  month: 'short', day: 'numeric' };
  const GetFromApi = (v) => {
    const apiKey ='850f27fce52c74a592c8106cd088d0a6';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${v}&appid=${apiKey}&units=metric&lang=fr`)
          .then((res) => res.json())
          .then((m) => {

            let tempMeteo = []
            let tempDMeteo = []
            let daysMeteo = formatDate(m.list[0].dt_txt)

            m.list.map(m => 
              {
              if (daysMeteo!==formatDate(m.dt_txt)){
                tempMeteo.push({'date':daysMeteo,'meteo':tempDMeteo})
                daysMeteo = formatDate(m.dt_txt)
     
                tempDMeteo = []
              }
              tempDMeteo.push({'time': m.dt_txt.split(" ")[1].split(":")[0] + "h" +  m.dt_txt.split(" ")[1].split(":")[1],'temp':m.main.temp,'vent':m.wind.speed,'desc':m.weather[0].description,'main': m.weather[0].main})
              })
              setMeteo(tempMeteo)
          }
        )
          .catch((error) => {
            console.log(error)
            return(error);
          });
  }

  useEffect(() => {
    GetFromApi(props.v);
    setVille(props.v);
  },[props.v]);
   return (
        <View style={styles.weatherView}>
          <Text style={styles.weatherTile}>{new Date().toLocaleDateString("fr-CA",options)}</Text>
          <Text>voici la météo de {ville}</Text>
          <Text>{meteo.length}</Text>
          <WeatherLogo style={styles.logo} main={meteo[0].meteo[0].main}/>
          <Text style={styles.weatherTile} >
              {meteo[0].meteo[0].desc}
          </Text>
          <View style={styles.weatherInfos}>
            <Text style={styles.weatherInfo}>🌡️  {meteo[0].meteo[0].temp}°c</Text>
            <Text style={styles.weatherInfo}>💨  {meteo[0].meteo[0].vent} Km/h</Text>
          </View>
          <View style={{height: '28%'}} >
          <ScrollView vertical={true} style={styles.scrollView}>
            {meteo.map((day,index) => 
              <View style={{flex:6}} key={index}>
                <Text style={{textAlign:'center',fontWeight:'bold'}}>{day.date}</Text>  
                <View style={{flexDirection:'row',padding:10,flex:1}} >
                  {day.meteo.map((m,index) =>         
                  <View key={index} >
                    <Text>{m.time}</Text>
                    <Text >🌡️  {m.temp}°c</Text>
                    <Text >💨  {m.vent} Km/h</Text>
                  </View>) }
                </View>
              </View>
            )}
          </ScrollView>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  weatherView : {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    paddingTop:20
  },
  scrollView : {
    flex:1,
    height:2
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
  }
});