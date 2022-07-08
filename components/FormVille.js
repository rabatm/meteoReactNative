import { useState,useEffect } from 'react';
import { StyleSheet, TextInput,TouchableOpacity,Text, View } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormVille(props) {
  const [ville,setVille]=useState(props.v);
  const apiKey ='850f27fce52c74a592c8106cd088d0a6';


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@ville', ville)
      updateVille()
    } catch (e) {
      console.log("errer")
    }
  }

  useEffect(() => {
    setVille(props.v);
  },[props.v]);

  const updateVille = () => {

    props.updateVille(ville)
   }
   
  const getCitybyCoord = async (l) =>
  {

    const apiKey ='850f27fce52c74a592c8106cd088d0a6';
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${l.coords.latitude}&lon=${l.coords.longitude}&limit=5&appid=${apiKey}`)
          .then((res) => res.json())
          .then((v) => {
            setVille(v[0].name)
            updateVille()
          })
          .catch((error) => {
            console.log(error);
          });
  }


  const getLocate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    
    Location.getCurrentPositionAsync({}).then(getCitybyCoord);
    
    
  }

   return (
    <View >
        <View style={styles.fromV}>
            <TextInput
            style={styles.input}
            autoCapitalize = {"characters"}
            onChangeText={setVille}
            value={ville}/>
        <TouchableOpacity onPress={() => updateVille()}>
          <Text style={styles.look}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getLocate()}>
          <Text style={styles.look}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => storeData()}>
          <Text style={styles.look}>💾</Text>
        </TouchableOpacity>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
fromV: {
    flexDirection:'row'
  },
  input: {
    borderWidth: 2,
    borderRadius: 15,
    height: 40,
    width: '50%',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  look: {
    fontSize:30
  }
});