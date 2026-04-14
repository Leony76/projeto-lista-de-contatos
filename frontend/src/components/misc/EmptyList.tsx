import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  message: string;
};

const EmptyList = ({
  message,
}:Props): React.JSX.Element => {
  return (
    <View style={style.container}>
      <MaterialCommunityIcons 
        name="account-question-outline" 
        size={32} 
        color="orange" 
      />

      <Text style={style.message}>
        { message }
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    color: 'orange',
    textAlign: 'center',
  },
});

export default EmptyList