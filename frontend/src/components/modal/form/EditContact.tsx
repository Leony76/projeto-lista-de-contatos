import { Input } from '@/components/input';
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '@/components/button';
import { ModalType } from '..';
import { ContactService } from '@/services/contactService';
import { Contact } from '@/types/contact';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import * as ImagePicker from 'expo-image-picker';

type Props = ModalType & {
  contact   : Contact;
  onSuccess : () => void;
};

const EditContact = ({
  onRequestClose,
  visible,
  contact,
  onSuccess,
}:Props) => {

  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name         : contact?.name ?? '',
    phone        : contact?.phone ?? '',
    profilePhoto : contact?.profilePhoto ?? '',
  });

  useEffect(() => {
    if (contact) {
      setNewContact({
        name: contact.name,
        phone: contact.phone,
        profilePhoto : contact.profilePhoto,
      });
    }
  }, [contact, visible]);

  const handleEditContact = async():Promise<void> => {
    try { 
      const payload: Contact = {
        id           : contact.id, 
        name         : newContact.name,
        phone        : newContact.phone,
        profilePhoto : newContact.profilePhoto,
      };

      await ContactService.update(payload.id, payload);

      onSuccess();
    } catch (error: unknown) {  
      console.error("Houve um erro ao adicionar o contato!: " + error);
    } finally {
      onRequestClose();
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],
      quality: 0.5, 
      base64: true, 
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      
      setNewContact(prev => ({ ...prev, profilePhoto: base64Image }));
    }
  };

  const noData: boolean = (!newContact.name || newContact.phone.trim().length !== 15);

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

              <Pressable 
              onPress={onRequestClose}
              style={({ pressed }) => [{
                marginRight: -8,
                padding: 12,
                filter    : [{ brightness: pressed ? 1.2 : 1 }],
                transform : [{ scale: pressed ? 0.9 : 1 }],
              }]}
              >
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

            <Pressable 
            onPress={pickImage} 
            style={style.contact_photo_container}
            >
              {newContact.profilePhoto ? (
                <Image 
                  style={style.selected_image}
                  source={
                    typeof newContact.profilePhoto === 'string' 
                      ? { uri: newContact.profilePhoto } 
                      : newContact.profilePhoto 
                  } 
                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <AntDesign 
                    name="camera" 
                    size={32} 
                    color="orange" 
                  />

                  <Text style={{ color: 'orange' }}>
                    Foto (opcional)
                  </Text>
                </View>
              )}
            </Pressable>

            <View style={style.inputs_container}>
              <Input.Default
                label='Nome do contato (Até 15 caracteres)'
                placeholder='Fulano de tal'
                onChange={(name) => setNewContact(prev => ({ ...prev, name }))}
                maxLength={15}
                value={newContact.name}
                Icon={() => <AntDesign name="tag" size={18} color="darkorange" />}
              />

              <Input.Default
                placeholder='(XX) XXXXX-XXXX'
                maxLength={15}
                keyboardType='phone-pad'
                value={newContact.phone}
                label='Número de telefone'
                Icon={() => <Feather name="phone" size={18} color="darkorange" />}
                onChange={(phone) => {
                  const formatted = formatPhoneNumber(phone);
                  setNewContact(prev => ({ ...prev, phone: formatted }));
                }}
              />
            </View>
            
            <Button.Default
              disable={ noData }
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
    width: 315,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffc689',
    paddingHorizontal: 10,
    paddingBottom: 14,
    paddingTop: 6,
    gap: 6,
  },

  form_title: {
    fontSize: 24,
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
    color: 'orange',
    marginBottom: 8,
  },

  selected_image: {
    width: 150,      
    height: 150,    
    borderRadius: 75, 
    borderWidth: 1,
    borderColor: 'darkorange',
  },
  
  contact_photo_container: {
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'darkorange',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E6',
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default EditContact