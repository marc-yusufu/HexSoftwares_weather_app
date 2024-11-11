import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { View, Text, ScrollView, StyleSheet, TextInput, SafeAreaView, Image, Linking, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { weatherConditions } from '../Conditions/WeatherConditions';
import PropTypes from 'prop-types';


const Weather = ({temperature, conditions}) => {

    const [time, setTime] = useState();
    const [description, setDescription] = useState('');

    const [location, setLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
    
          // Use reverseGeocodeAsync to get the address from the coordinates
          let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
    
          // Extract city or any other location detail you need
          if (address.length > 0) {
            setLocationName(address[0].city || address[0].region || 'Unknown location');
          }
        })();
    },[]);

    useEffect(()=>{
        if(temperature <= 25 || temperature >= 10){
            setDescription('Fair')
        }else if(temperature < 10){
            setDescription('Cold');
        }else if(temperature > 25){
            setDescription('Hot');
        }
    },[])

    useEffect(()=>{
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        if(hours >= 12 && hours <= 23){
            setTime(hours + ':' + minutes + ' PM');
        }else{
            setTime(hours + ':' + minutes + ' AM');
        }
        
    },[])

    const handleLink = () =>{
        Linking.openURL('https://www.google.com/search?q=johannesburg+weather&sca_esv=a07f0383584960a3&sxsrf=ADLYWIKwRX1qsVOrheQrgzrHPILlSZM3mw%3A1731321980675&ei=fOAxZ_j2KPiUhbIPye7Q2Qs&oq=johnnesbur&gs_lp=Egxnd3Mtd2l6LXNlcnAiCmpvaG5uZXNidXIqAggCMgcQIxixAhgnMg4QLhiABBiRAhixAxiKBTINEAAYgAQYsQMYgwEYCjIKEAAYgAQYsQMYCjINEAAYgAQYsQMYgwEYCjIQEC4YgAQYsQMYxwEYChivATINEC4YgAQYxwEYChivATINEAAYgAQYsQMYgwEYCjIKEAAYgAQYsQMYCjIKEAAYgAQYsQMYCjIdEC4YgAQYkQIYsQMYigUYlwUY3AQY3gQY4ATYAQFI7yJQiQhY_xJwA3gBkAEBmAHoAqAB8QyqAQMzLTW4AQPIAQD4AQGYAgmgAuclwgIKEAAYsAMY1gQYR8ICDRAuGIAEGLADGEMYigXCAgcQABiABBgNwgIJEAAYgAQYChgNwgINEC4YgAQYxwEYDRivAZgDAIgGAZAGCboGBggBEAEYFJIHCTMuMy00LjctMqAHhkI&sclient=gws-wiz-serp');
    }

  return (
    <SafeAreaView style={[styles.flexContainer,
        {backgroundColor: weatherConditions[conditions]?.color || '#90d0fe'}]}>
    <StatusBar translucent={true} style='inverted'/>
    <ScrollView style={{flex: 1}}>

        <View style={styles.mainContainer}>
            <View style={styles.location}>
                <Image style={styles.locationPin} source={require('../assets/pin.png')}/>
                <Text style={styles.locationName}>{errorMsg ? errorMsg : locationName ? locationName : 'Location...'}</Text>
            </View>
            <View style={styles.temperature}>
                <Image source={weatherConditions[conditions]?.icon || ''} style={styles.icon}/>
                <Image source={weatherConditions[conditions]?.icon2 || require('../assets/loading.png')} style={styles.icon2}/>
                <Text style={styles.descript}>{description}</Text>
                <Text style={styles.temp} onPress={handleLink}>
                    {temperature ? (Math.round(temperature) + '°C') : ('')}
                </Text>
                <Text style={styles.condition}>{weatherConditions[conditions]?.title || '...'}</Text>
                <Text style={{borderBottomWidth: 1, borderBottomColor: '#d6d6d6',}}></Text>
                <TouchableOpacity style={styles.infoContainer1} onPress={handleLink}>
                    <Text style={styles.info}>{weatherConditions[conditions]?.info || 'Refreshing...'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoContainer2} onPress={handleLink}>
                    <Text style={styles.info}>{weatherConditions[conditions]?.info2 || 'Refreshing...'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoContainer3} onPress={handleLink}>
                    <Text style={styles.info}>{weatherConditions[conditions]?.info3 || 'Refreshing...'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.sub}>{weatherConditions[conditions]?.subtitle || '...'}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.sunrise}>
                    <Image source={weatherConditions[conditions]?.sunrise || require('../assets/loading.png')} style={styles.suns}/>
                    <Text style={styles.sunText}>Sunrise</Text>
                    <Text style={styles.sunTime}>5:12</Text>
                </View>
                <View style={styles.sunset}>
                    <Image source={weatherConditions[conditions]?.sunset || require('../assets/loading.png')} style={styles.suns}/>
                    <Text style={styles.sunText}>Sunset</Text>
                    <Text style={styles.sunTime}>18:30</Text>
                </View>
            </View>
        </View>
    </ScrollView>

    </SafeAreaView>
  )
}

Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string
};

export default Weather

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
    },

    mainContainer:{
        margin: 'auto',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },

    searchBar:{
        padding: 10,
        borderWidth: 1,
        borderColor: '#efefef',
        width: '90%',
        borderRadius: 10,
        textAlign: 'center',
    }, 

    temperature:{
        width: '90%',
        marginTop: 20,
        height: 650,
    },

    footer:{
        width: '90%',
        padding: 10,
        marginTop: 15,
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#d6d6d6',
    },

    icon:{
        width: 100,
        height: 100,
    },

    icon2:{
        width: 100,
        height: 100,
        position: 'absolute',
        left: 60,
        top: 30,
    },

    celcius:{
        width: 80,
        height: 80,
    },

    temp:{
        fontSize: 60,
        fontWeight: '800',
        color: '#fff',
        marginTop: 40,
    },

    condition:{
        fontSize: 18,
        marginTop: 35,
        color: '#fff',
        alignSelf: 'center',
        fontWeight: '300',
    },

    sub:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

    time:{
        position: 'absolute',
        left: 300,
        top: 14,
        color: '#fff',
    },

    descript:{
        fontSize: 40,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        left: 240,
        top: 100,
    },

    infoContainer1: {
        backgroundColor: '#80b9ff',
        borderRadius: 15,
        padding: 38,
        margin: 'auto',
        width: '100%',
        marginTop: 20,
    },

    infoContainer2: {
        backgroundColor: '#80b9ff',
        borderRadius: 15,
        padding: 38,
        margin: 'auto',
        width: '100%',
        marginTop: 15,
    },

    infoContainer3: {
        backgroundColor: '#80b9ff',
        borderRadius: 15,
        padding: 38,
        margin: 'auto',
        width: '100%',
        marginTop: 15,
    },

    info:{
        color: '#fff',
    },

    bottomContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 50,
    },

    suns:{
        width: 50,
        height: 50,
    },

    sunrise:{
        alignItems: 'center',
    },

    sunset:{
        alignItems: 'center',
    },

    sunText:{
        fontSize: 11,
        color: '#fff',
        fontWeight: '300',
    },

    sunTime:{
        color: '#fff',
        fontWeight: '600'
    },

    locationName:{
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },

    location:{
        flexDirection: 'row',
        padding: 10,
        marginTop: 5,
    },

    locationPin:{
        width: 30,
        height: 30,
    }
})