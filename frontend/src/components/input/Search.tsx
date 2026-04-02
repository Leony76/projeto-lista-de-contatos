import React from 'react'
import { StyleProp, TextInput, View, ViewStyle } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto'; 
import { style as defaultStyle } from './css/default.css';

type Props = {
  customStyle?: { 
    flex: number;
  };
};

const Search = ({
  customStyle
}:Props) => {
  return (
    <View style={[defaultStyle.container, customStyle]}>
      <FontAwesome 
        name="search" 
        size={18} 
        color="darkorange" 
      />
      
      <TextInput 
        style={defaultStyle.input}
        placeholder='Pesquisar'
        placeholderTextColor={'darkorange'}
      />

      <Fontisto 
        name="close-a" 
        size={12} 
        color="darkorange" 
      />
    </View>
  )
}

export default Search