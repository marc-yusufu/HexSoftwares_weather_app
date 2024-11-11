import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.flexContainer}>
      <Image source={require('../assets/loading3.gif')} style={styles.animation}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
        margin: 'auto',
        marginTop: 300,
    },

    animation:{
      width: 200,
      height: 200,
    }
})