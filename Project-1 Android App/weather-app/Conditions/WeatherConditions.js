import { Image, StyleSheet } from "react-native";

export const weatherConditions = {
    Clear: {
        color: '#90d0fe',
        title: 'Clear Skies',
        subtitle: 'Do not forget your sunscreen',
        info: 'Rain possible overnight',
        info2: 'Temperature rise over the next days',
        info3: 'Winds are moderate',
        icon: require('../assets/sun.png'),
        icon2: require('../assets/cloudy.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Rain:{
        color: '#b2bed1',
        title: 'Raining',
        subtitle: 'Carry your umbrella',
        info: 'Rain possible overnight',
        info2: 'Temperature to drop a few degrees',
        info3: 'Medium high winds',
        icon: require('../assets/rainy.png'),
        icon2: require('../assets/wind.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Thunderstorm: {
        color: '#757474',
        title: 'Thunderstorm',
        subtitle: 'Thunder and heavy rain',
        icon: require('../assets/thunderstorm.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Clouds: {
        color: '#8b99ad',
        title: 'Cloudy',
        subtitle: 'Marshmallows in the sky',
        info: 'Rain possible overnight',
        info2: 'Higher UV index',
        info3: 'Slow winds throughout the day',
        icon: require('../assets/cloudy.png'),
        icon2: require('../assets/cloudy.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Drizzle: {
        color: '#4595b0',
        title: 'Drizzle',
        subtitle: 'Feels like a relaxing shower',
        info: 'No rain expected tonight',
        info2: 'Temperature rise over the next days',
        info3: 'Winds are moderate',
        icon: require('../assets/drizzle.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Haze: {
        color: '#c0c7d1',
        title: 'Haze',
        subtitle: 'Better to drive with headlights on',
        info: 'Light rain and low visibilty',
        info2: 'Cooler temperature for the next couple of days',
        info3: 'No wind',
        icon: require('../assets/haze.png'),
        icon2: require('../assets/haze.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Mist: {
        color: '#cedbed',
        title: 'Mist/Fog',
        subtitle: 'Best to drive with headlights on',
        info: 'Reduced visibility. Watch out!',
        info2: 'Temperature rise over the next days',
        info3: 'Wet and sliperry roads',
        icon: require('../assets/cloudy.png'),
        icon2: require('../assets/mist.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

    Snow: {
        color: '#d6d6d6',
        title: 'Snow',
        subtitle: 'Very low temperatures. Stay warm',
        info: 'Temperatures below zero',
        info2: 'Frozen ground. Watch your steps',
        info3: 'Drive 15 below speed limit; advised.',
        icon: require('../assets/heavy-snow.png'),
        icon2: require('../assets/snow.png'),
        sunrise: require('../assets/sunrise.png'),
        sunset: require('../assets/sunset.png'),
    },

}
