import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type Props = {
  label    : string;
  onClick  : () => void;
  selected : boolean;
};

const Default = ({
  label,
  onClick,
  selected,
}:Props) => {

  const containerStyle = selected ? [style.container, style.container__selected] : style.container;
  const textStyle = selected ? [style.text, style.text__selected] : style.text;
  
  return (
    <Pressable 
    style={containerStyle}
    onPress={onClick}
    >
      <Text style={textStyle}>
        { label }
      </Text>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'darkorange',
    backgroundColor: '#fff8e6',
    padding: 8,
    alignItems: 'center',
  },

  text: {
    color: 'darkorange',
    fontWeight: 500,
  },

  container__selected: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'darkorange',
    backgroundColor: 'darkorange',
    padding: 8,
    alignItems: 'center',
  },

  text__selected: {
    color: 'white',
    fontWeight: 500,
  },
});

export default Default