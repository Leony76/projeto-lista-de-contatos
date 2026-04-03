import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { ModalType } from '.';
import { Contact } from '@/types/contact';
import { generateRandomProfilePhotoPlaceholderBgColor } from '@/utils/generateRandomProfilePhotoPlaceholderBgColor';

type Props = ModalType & {
  image : Contact['profilePhoto'] | null;
  name  : Contact['name'];
};

const ImageExpand = ({
  onRequestClose,
  visible,
  image,
  name,
}:Props) => {

  const contactProfileImageBg: string = name ? name.trim().charAt(0).toUpperCase() : '?';
  const backgroundColorPlaceholder: string = generateRandomProfilePhotoPlaceholderBgColor(name);
  const contactName: string = name ? name.trim().length > 15 ? name.slice(0, 15) + '...' : name : '[ Nome não informado ]';

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
        <Text style={style.photo_name}>
          { contactName }
        </Text>

        { (image && image !== "") ? (
          <Image 
            style={style.profile_image}
            source={
              typeof image === "string"
              ? { uri: image }
              : image
            }
          />
        ) : (
          <View style={[style.no_profile_photo, { backgroundColor: backgroundColorPlaceholder }]}>
            <Text style={style.no_profile_photo_text}>
              { contactProfileImageBg }
            </Text>
          </View>
        )}
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

  profile_image: {
    width: 320,
    height: 320,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'orange',
  },

  no_profile_photo: {
    width: 320,
    height: 320,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },

  no_profile_photo_text: {
    color: 'gray',
    fontSize: 130,
    fontWeight: 700,
    marginBottom: 2
  },

  photo_name: {
    fontWeight: 700,
    color: 'darkorange',
    backgroundColor: '#fff9ee',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'orange',
  },
});

export default ImageExpand