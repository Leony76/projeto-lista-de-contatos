import React from 'react'
import { Pressable, TextInput, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto'; 
import { style as defaultStyle } from './css/default.css';

type Props = {
  onClearSearch : () => void;
  onChange      : (text: string) => void;
  value         : string | null;
  customStyle?: { 
    flex: number;
  };
};

const Search = ({
  customStyle,
  onClearSearch,
  onChange,
  value,
}:Props) => {
  return (
    <View style={[defaultStyle.container, customStyle]}>
      <FontAwesome 
        name="search" 
        size={18} 
        color="darkorange" 
      />
      
      <TextInput 
        onChangeText={onChange}
        value={value ?? ''}
        style={defaultStyle.input}
        placeholder='Pesquisar'
        placeholderTextColor={'darkorange'}
      />

      <Pressable onPress={onClearSearch}>
        <Fontisto 
          name="close-a" 
          size={12} 
          color="darkorange" 
        />
      </Pressable>
    </View>
  )
}

export default Search