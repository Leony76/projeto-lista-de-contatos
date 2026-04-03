import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { style as defaultStyle } from './css/default.css';

type Props = {
  onChange      : (text: string) => void;
  Icon?         : React.ElementType;
  label?        : string;     
  placeholder   : string;
  value         : string | null;
  keyboardType?: 'default' | 'numeric' | 'phone-pad'; 
  maxLength?    : number; 
  customStyle?: { 
    flex: number;
  };
};

const Default = ({
  customStyle,
  placeholder,
  maxLength,
  onChange,
  label,
  Icon,
  value,
  keyboardType = 'default',
}:Props) => {
  return (
    <View style={style.container}>
      { !!label && 
        <Text style={style.label}>
          { label }
        </Text>
      }

      <View style={[defaultStyle.container, customStyle]}>
        { Icon && <Icon/> }
        
        <TextInput 
          onChangeText={onChange}
          value={value ?? ''}
          maxLength={maxLength}
          keyboardType={keyboardType} 
          style={[defaultStyle.input, { paddingVertical: 8 }]}
          placeholder={placeholder}
          placeholderTextColor={'#ffd64e'}
        />
      </View>
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    gap: 4,
  },
  
  label: {
    fontWeight: '600',
    color: 'darkorange',
  },
});

export default Default