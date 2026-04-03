import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from '@/components/button';
import { ModalType } from '.';
import Entypo from '@expo/vector-icons/Entypo';

type Props = ModalType & {
  confirmMessage: string;
  onClick: {
    confirm : () => void;
    cancel  : () => void;
  };
};

const ConfirmAction = ({
  onRequestClose,
  confirmMessage,
  visible,
  onClick,
}:Props) => {

  return (
    <Modal
    visible={visible}
    onRequestClose={onRequestClose}
    animationType='fade'
    transparent
    >
      <Pressable 
      style={style.modal_overlay}
      onPress={onRequestClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={style.container}>
            <View style={style.form_title_and_close_form_container}>
              <Text style={style.form_title}>
                Confirmar ação
              </Text>

              <Pressable onPress={onRequestClose}>
                <AntDesign 
                  name="close" 
                  size={18} 
                  color="darkorange" 
                />
              </Pressable>
            </View>

            <Text style={style.form_message}>
              { confirmMessage }
            </Text>

            <View style={style.inputs_container}>
              <Button.Default
                selected
                flex={1}
                label='Confirmar'
                Icon={() => <Entypo name="check" size={18} color="white" />}
                onClick={onClick.confirm}
                />

              <Button.Default
                flex={1}
                label='Cancelar'
                Icon={() => <AntDesign name="close" size={18} color="darkorange" />}
                onClick={onClick.cancel}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const style = StyleSheet.create({
  modal_overlay: {
    backgroundColor: '#00000037',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 315,
    borderWidth: 1,
    borderColor: '#ffc689',
    paddingHorizontal: 10,
    paddingVertical: 14,
    gap: 8,
  },

  form_title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'darkorange',
  },

  inputs_container: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 8,
  },

  form_title_and_close_form_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  form_message: {
    color: 'orange',
  },
});

export default ConfirmAction