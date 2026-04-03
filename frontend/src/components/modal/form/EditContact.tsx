import { Input } from '@/components/input';
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '@/components/button';
import { ModalType } from '..';
import { ContactService } from '@/services/contactService';
import { Contact } from '@/types/contact';

type Props = ModalType & {
  contact   : Omit<Contact, 'profilePhoto'>;
  onSuccess : () => void;
};

const EditContact = ({
  onRequestClose,
  visible,
  contact,
  onSuccess,
}:Props) => {

  const [newContact, setNewContact] = useState<Pick<Contact, 'name' | 'phone'>>({
    name  : contact?.name ?? '',
    phone : contact?.phone ?? '',
  });

  useEffect(() => {
    if (contact) {
      setNewContact({
        name: contact.name,
        phone: contact.phone,
      });
    }
  }, [contact]);

  const handleEditContact = async():Promise<void> => {
    try { 
      const payload: Omit<Contact, 'profilePhoto'> = {
        id    : contact.id, 
        name  : newContact.name,
        phone : newContact.phone,
      };

      await ContactService.update(payload.id, payload);

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
                Editar Contato
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
              Informe os novos dados do contato.
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
              label='Editar'
              Icon={() => <AntDesign name="edit" size={18} color="darkorange" />}
              onClick={handleEditContact}
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

export default EditContact