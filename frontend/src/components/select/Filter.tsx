import { SelectOptionsSchema } from '@/types/SelectOptionsSchema';
import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet, Modal, FlatList } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { style as defaultStyle } from './css/default.css';
import Entypo from '@expo/vector-icons/Entypo';
import { selectOptionsSchemaMap } from '@/constants/maps/selectOptionsSchemaMap';
import { Button } from '../button';
import { ContactFilterValue } from '@/types/contactFIlterValue';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  iconOnly?      : boolean;
  optionsSchema  : SelectOptionsSchema;
  setFilterValue : React.Dispatch<React.SetStateAction<ContactFilterValue | null>>;
  filterValue    : ContactFilterValue | null; 
  customStyle?: {
    flex: number;
  };
};

const Filter = ({
  optionsSchema,
  customStyle,
  filterValue,
  iconOnly = false,
  setFilterValue,
}:Props) => {

  const optionsSchemaRender = selectOptionsSchemaMap[optionsSchema];
  const [showOptions, setShowOptions] = useState(false);

  const titleMap = {
    CONTACT: 'contato',
  };

  const handleSelect = (value: ContactFilterValue | null) => {
    setFilterValue(value);
    setShowOptions(false);
  };

  return (
    <>
    <View style={[defaultStyle.container, customStyle]}>
      {!iconOnly ? (
        <>
          <Feather 
            name="filter" 
            size={18} 
            color={defaultStyle.select.color} 
          />
      
          <Pressable
          onPress={() => setShowOptions(true)}
          style={defaultStyle.select}
          >
            <Text style={defaultStyle.select_text}>
              Filtro
            </Text>
          </Pressable>

          <Entypo 
            name="chevron-down" 
            size={18} 
            color={defaultStyle.select.color} 
          />
        </>
      ) : (
        <Pressable
        onPress={() => setShowOptions(true)}
        style={defaultStyle.select}
        >
          <Text style={defaultStyle.select_text}>
            <Feather 
              name="filter" 
              size={18} 
              color={defaultStyle.select.color} 
            />
          </Text>
        </Pressable>
      )}

    </View>

    <Modal
    visible={showOptions}
    animationType='fade'
    transparent
    onRequestClose={() => setShowOptions(false)}
    >
      <Pressable 
      style={style.modal_overlay} 
      onPress={() => setShowOptions(false)}
      >
        <View style={style.modal_container}>
          <View style={style.modal_title_and_close_button_container}>
            <Text style={style.modal_title}>
              Filtros de { titleMap[optionsSchema] }
            </Text>

            <Pressable onPress={() => setShowOptions(false)}>
              <AntDesign 
                name="close" 
                size={18} 
                color={style.modal_title.color}
              />
            </Pressable>
          </View>

          <Text style={style.modal_message}>
            Selecione um filtro.
          </Text>

          <Button.Default
            selected={!filterValue}
            label={'Nenhum'}
            onClick={() => handleSelect(null)}
          />

          <FlatList
            data={optionsSchemaRender}
            keyExtractor={(item) => item.value}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <Button.Default
                selected={item.value === filterValue}
                label={item.label}
                onClick={() => handleSelect(item.value)}
              />
            )}
          />        
        </View>
      </Pressable>
    </Modal>
    </>
  )
}

const style = StyleSheet.create({
  modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal_container: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffdc69',
    width: '90%',
    gap: 8,
  },

  modal_message: {
    color: 'gray',
    marginBottom: 8,
  },

  modal_title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'darkorange',
  },

  modal_title_and_close_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Filter;