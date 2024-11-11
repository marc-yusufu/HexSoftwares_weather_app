import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Weather from './Screens/Weather';
import { API_KEY } from './APIKey/WeatherAPIKey';
import Loading from './Screens/Loading';

export default class App extends React.Component {

  state = {
    isLoading: false,
    temperature: 0,
    conditions: null,
    error: null,
  };

  // requesting location permission
  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
        isLoading: false,
      });
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    this.fetchWeather(location.coords.latitude, location.coords.longitude);
  }

  //retrieving data from API
  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          conditions: json.weather[0].main,
          isLoading: false,
        });

      })
      .catch(error => {
        this.setState({
          error: 'Error fetching weather data',
          isLoading: false,
        });
      });
  }


  render() {
    const {isLoading, temperature, conditions, error} = this.state;
    return (
      <View style={{flex: 1}}>
        { isLoading ? (
          <Loading />
        ) : (
          <Weather temperature={temperature} conditions={conditions} error={error} setState={this.setState}/>
        ) }
      </View>
    )
  }
}

const styles = StyleSheet.create({

});
