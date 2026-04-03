import React from 'react'
import { Modal, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { ModalType } from '.';
import { Contact } from '@/types/contact';
import Feather from '@expo/vector-icons/Feather';

type Props = ModalType & {
  contact: Contact;
};

const Calling = ({
  visible,
  onRequestClose,
  contact,
}:Props) => {

  const noProfilePhotoBgColorsPalette = ['#FFC0CB', '#87CEEB', '#FFD700', '#FFA500', '#90EE90', '#D3D3D3', '#ffb3b3'];

  const getColorIndex = () => {
    if (!contact?.name) return 0;
    const charSum = contact.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return charSum % noProfilePhotoBgColorsPalette.length;
  };

  const backgroundColorPlaceholder = noProfilePhotoBgColorsPalette[getColorIndex()];

  if (!contact) return null;

  return (
    <Modal
    visible={visible}
    onRequestClose={onRequestClose}
    animationType='slide'
    transparent
    >
      <View style={style.modal_overlay}>
        <View style={style.upper_container}>
          <Text style={style.contact_name}>
            { contact.name }
          </Text>

          { contact.profilePhoto ? (
            <Image 
              style={style.profile_image}
              source={
                typeof contact.profilePhoto === "string"
                ? { uri: contact.profilePhoto }
                : contact.profilePhoto
              }
            />
          ) : (
            <View style={[style.no_profile_photo, { backgroundColor: backgroundColorPlaceholder }]}>
              <Text style={style.no_profile_photo_text}>
                { contact.name[0].toUpperCase() }
              </Text>
            </View>
          )}
        </View>

        <View style={style.lower_container}>
          <Pressable onPress={onRequestClose}>
            <Feather 
              name="phone-off" 
              size={32} 
              color="red" 
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modal_overlay: {
    backgroundColor: '#ffd485',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 24,
  },

  upper_container: {
    flex: 6,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffc689',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    gap: 8,
  },

  lower_container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  profile_image: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: 'darkorange',
  },

  no_profile_photo: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: 'darkorange',
    justifyContent: 'center',
    alignItems: 'center',
  },

  no_profile_photo_text: {
    color: 'gray',
    fontSize: 50,
    fontWeight: 600,
    marginBottom: 2
  },

  contact_name: {
    fontSize: 24,
    fontWeight: 600,
  },
});

export default Calling