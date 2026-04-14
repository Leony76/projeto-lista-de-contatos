import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Spinner from './Spinner'

const ApplicationLoadingView = (): React.JSX.Element => {
  return (
    <View style={style.loading_full_screen}>
      <Spinner />
      <Text style={style.header_title}>
        O que há na aplicação
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  loading_full_screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
  },

  header_title: {
    color: 'darkorange',
    fontWeight: 700,
    fontSize: 20,
  },
});

export default ApplicationLoadingView