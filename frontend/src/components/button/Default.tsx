import { ButtonType } from '@/types/button';
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type Props = ButtonType;

const Default = ({
  label,
  onClick,
  flex,
  selected,
  borderless,
  pHorizontal,
  pVertical,
  bgTransparent,
  Icon,
  fontSize,
  disable = false,
}:Props) => {

  const containerStyle = selected ? [style.container, style.container__selected] : style.container;
  const textStyle = selected ? [style.text, style.text__selected] : style.text;
  
  return (
    <Pressable 
    disabled={disable}
    style={({ pressed }) => [
      containerStyle, 
      borderless    ? { borderWidth: 0, paddingHorizontal: 0 } : undefined, 
      bgTransparent ? { backgroundColor: '#ffffff00' }       : undefined,
      pHorizontal   ? { paddingHorizontal: pHorizontal }       : undefined,
      pVertical     ? { paddingVertical: pVertical }           : undefined,
      flex          ? { flex }                                 : undefined,
      {
        opacity: disable ? 0.5 : 1,
        transform: [{ scale: pressed ? 0.9 : 1 }],
      }
    ]}
    onPress={onClick}
    >
      {Icon && <Icon/>}

      <Text style={[textStyle, fontSize === 'XS' ? { fontSize: 12 } : undefined]}>
        { label }
      </Text>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'darkorange',
    backgroundColor: '#fff8e6',
  },

  text: {
    color: 'darkorange',
    fontWeight: 500,
  },

  container__selected: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'darkorange',
    backgroundColor: 'darkorange',
  },

  text__selected: {
    color: 'white',
    fontWeight: 500,
  },
});

export default Default