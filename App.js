import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity,SafeAreaView,ImageBackground,View } from 'react-native';
import FormVille from './components/FormVille';
import Weather from './components/Weather';
import Weather5D from './components/Weather5D';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [ville,setVille] = useState('')
  const [page,setPage] = useState('1D')

  const getData = async () => {
    console.log(ville,'e')
    try {
      const value = await AsyncStorage.getItem('@ville')
      
      if(value !== null) {      
        setVille(value)
      }
    } catch(e) {
      console.log("errer")
    }
  }


  useEffect(() => {

  if(ville=='') getData()
    
  });
  const updateVille = (nV) => {
    setVille(nV)
  }

  const updatePAge = (p) => {
    setPage(p)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/background.png')}>       
      <View style={styles.button}>
        <TouchableOpacity onPress={() => updatePAge('1D')}>
          <Text style={styles.look}>1 📅</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updatePAge('5D')}>
          <Text style={styles.look}>5 📅</Text>
        </TouchableOpacity>
      </View>
      {(page==='1D') &&
      <Weather v={ville} style={{flex:4}}/>
      }
      {(page==='5D') &&
      <Weather5D v={ville} style={{flex:4}}/>}
      <FormVille v={ville} updateVille={updateVille} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  look: {
    fontSize:30,
    borderWidth:2,
    borderColor:'white',
    backgroundColor:'white',
    width:150,
    textAlign:'center',
    marginTop:10
  },
  button: 
    {flexDirection: "row",
    flex:0.1,
    justifyContent:"space-evenly",
    

  }
});
