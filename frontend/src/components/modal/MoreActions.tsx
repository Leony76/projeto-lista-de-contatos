import React from 'react'
import { Button } from '../button';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { ButtonType } from '@/types/button';
import { ModalType } from '.';

type Props = ModalType & {
  buttons : ButtonType[];
};

const MoreActions = ({
  visible,
  onRequestClose,
  buttons,
}:Props) => {
  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}
    >
      <Pressable 
      style={style.modal_overlay} 
      onPress={onRequestClose} 
      >
        <View style={style.floating_menu}>
          {buttons.map((button, index) => {
            
            const IconComponent = button.Icon;

            return (
              <Button.Default
                key={index}
                label={button.label}
                Icon={IconComponent ? () => <IconComponent/> : undefined}
                onClick={() => {
                  button.onClick();
                  onRequestClose();
                }}
              />  
            )
          })}
        </View>
      </Pressable>
    </Modal>
  )
}

const style = StyleSheet.create({
  floating_menu: {
    position: 'absolute',
    top: 60,              
    right: 15,            
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,        
    
    elevation: 5,
    shadowColor: 'darkorange',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  modal_overlay: {
    flex: 1,
  },
});

export default MoreActions