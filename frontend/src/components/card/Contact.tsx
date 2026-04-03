import { Contact as ContactType } from '@/types/contact';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '../button';
import { generateRandomProfilePhotoPlaceholderBgColor } from '@/utils/generateRandomProfilePhotoPlaceholderBgColor';
import { Modal } from '../modal';

type Props = ContactType & {
  moreActionsVisible: boolean;
  onClick: {
    call        : () => void;
    moreActions : () => void; 
    edit        : () => void;
    remove      : () => void;
  },
};

const Contact = ({
  name,
  phone,
  profilePhoto,
  moreActionsVisible,
  onClick,
}:Props) => {

  const backgroundColorPlaceholder: string = generateRandomProfilePhotoPlaceholderBgColor(name);
  const [imageExpand, setImageExpand] = useState<boolean>(false);

  const contactName: string = name ? name.trim().length > 15 ? name.slice(0, 15) + '...' : name : '[ Nome não informado ]';
  const contactPhone: string = phone ? phone.trim().length > 15 ? phone.slice(0, 15) + '...' : phone : '[ Número não informado ]';
  const contactPhoto: string = name ? name[0].toUpperCase() : '?'

  return (
    <>
    <Modal.ImageExpand
      visible={imageExpand}
      onRequestClose={() => setImageExpand(false)}
      image={profilePhoto}
      name={name}
    />

    <View style={style.container}>
      <View style={style.main_content}>
        { profilePhoto ? (
          <Pressable onPress={() => setImageExpand(true)}>
            <Image 
              style={style.profile_image}
              source={
                typeof profilePhoto === "string"
                ? { uri: profilePhoto }
                : profilePhoto
              }
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => setImageExpand(true)}>
            <View style={[style.no_profile_photo, { backgroundColor: backgroundColorPlaceholder }]}>
              <Text style={style.no_profile_photo_text}>
                { contactPhoto }
              </Text>
            </View>
          </Pressable>
        )}

        <View style={style.contact_name_and_phone_container}>
          <Text style={style.contact_name_text}>
            { contactName }
          </Text>

          <Text style={style.contact_phone_text}>
            { contactPhone }
          </Text>
        </View>

        <View style={style.contact_more_options_container}>
          <Pressable 
          onPress={onClick.call}
          style={({ pressed }) => [{
            padding: 10,
            filter    : [{ brightness: pressed ? 1.2 : 1 }],
            transform : [{ scale: pressed ? 0.9 : 1 }],
          }]}
          >
            <Feather 
              name="phone-call" 
              size={20} 
              color="darkorange" 
            />
          </Pressable>
          
          <Pressable 
          onPress={onClick.moreActions}
          style={({ pressed }) => [
            {
              padding: 10,
              filter    : [{ brightness: pressed ? 1.2 : 1 }],
              transform : [{ scale: pressed ? 0.9 : 1 }],
            }
          ]}
          >
            <Entypo 
              name="dots-three-vertical" 
              size={20} 
              color={moreActionsVisible ? '#ffd780' : 'darkorange'} 
            />
          </Pressable>
        </View>
      </View>
      
      { moreActionsVisible && 
        <View style={style.more_actions_container}>
          <Button.Default
            label='Editar'
            onClick={onClick.edit}
            Icon={() => <AntDesign name="edit" size={20} color="darkorange" />}
            borderless
            bgTransparent
            fontSize='SM'
            pVertical={8}
          />

          <Button.Default
            label='Remover'
            onClick={onClick.remove}
            Icon={() => <AntDesign name="user-delete" size={20} color="darkorange" />}
            borderless
            bgTransparent
            fontSize='SM'
            pVertical={8}
          />
        </View>
      }
    </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    gap: 8,
    borderColor: '#ffd484',
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 7,
    backgroundColor: '#fff9ee',
  },
  
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'darkorange',
  },
  
  contact_name_and_phone_container: {
  },
  
  contact_name_text: {
    fontWeight: 600,
    fontSize: 17,
    color: 'darkorange',
  },
  
  contact_phone_text: {
    color: 'orange',
  },
  
  contact_more_options_container: {
    flexDirection: 'row',
    marginLeft: 'auto',    
  },

  main_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  more_actions_container: {
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#ffd484',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  no_profile_photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'darkorange',
    justifyContent: 'center',
    alignItems: 'center',
  },

  no_profile_photo_text: {
    color: 'gray',
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 2
  },
});

export default Contact

 