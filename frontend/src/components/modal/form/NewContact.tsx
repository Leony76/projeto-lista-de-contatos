import { Input } from '@/components/input';
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '@/components/button';
import { ModalType } from '..';
import { ContactService } from '@/services/contactService';
import { Contact } from '@/types/contact';

type Props = ModalType & {
  onSuccess: () => void;
};

const NewContact = ({
  onRequestClose,
  visible,
  onSuccess,
}:Props) => {

  const [newContact, setNewContact] = useState<Pick<Contact, 'name' | 'phone'>>({
    name: '',
    phone: '',
  });

  const handleNewContact = async():Promise<void> => {
    try { 

      const payload: Pick<Contact, 'phone' | 'name'> = {
        name  : newContact.name,
        phone : newContact.phone,
      };

      await ContactService.create(payload);

      setNewContact({
        name: '',
        phone: '',
      });

      onSuccess();
    } catch (error: unknown) {  
      console.log("Houve um erro ao adicionar o contato!: " + error);
    } finally {
      onRequestClose();
    }
  };

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
                Novo Contato
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
              Informe o nome e o número do novo contato.
            </Text>

            <View style={style.inputs_container}>
              <Input.Default
                onChange={(name) => setNewContact(prev => ({ ...prev, name }))}
                placeholder='Nome do contato'
                value={newContact.name}
                label='Nome'
                Icon={() => <AntDesign name="tag" size={18} color="darkorange" />}
              />

              <Input.Default
                onChange={(phone) => setNewContact(prev => ({ ...prev, phone }))}
                placeholder='Número de telefone'
                value={newContact.phone}
                label='Número'
                Icon={() => <Feather name="phone" size={18} color="darkorange" />}
              />
            </View>
            
            <Button.Default
              label='Adicionar'
              Icon={() => <AntDesign name="user-add" size={18} color="darkorange" />}
              onClick={handleNewContact}
            />
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
    gap: 4,
    marginBottom: 8
  },

  form_title_and_close_form_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  form_message: {
    color: '#b2b2b2',
  },
});

export default NewContact