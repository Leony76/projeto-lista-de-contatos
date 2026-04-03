import { Contact as ContactType } from '@/types/contact';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '../button';

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

  const noProfilePhotoBgColorsPalette = ['#FFC0CB', '#87CEEB', '#FFD700', '#FFA500', '#90EE90', '#D3D3D3', '#ffb3b3'];

  const getColorIndex = () => {
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return charSum % noProfilePhotoBgColorsPalette.length;
  };

  const backgroundColorPlaceholder = noProfilePhotoBgColorsPalette[getColorIndex()];

  return (
    <View style={style.container}>
      <View style={style.main_content}>
        { profilePhoto ? (
          <Image 
            style={style.profile_image}
            source={
              typeof profilePhoto === "string"
              ? { uri: profilePhoto }
              : profilePhoto
            }
          />
        ) : (
          <View style={[style.no_profile_photo, { backgroundColor: backgroundColorPlaceholder }]}>
            <Text style={style.no_profile_photo_text}>
              { name[0].toUpperCase() }
            </Text>
          </View>
        )}

        <View style={style.contact_name_and_phone_container}>
          <Text style={style.contact_name_text}>
            { name }
          </Text>

          <Text style={style.contact_phone_text}>
            { phone }
          </Text>
        </View>

        <View style={style.contact_more_options_container}>
          <Pressable onPress={onClick.call}>
            <Feather 
              name="phone-call" 
              size={20} 
              color="darkorange" 
            />
          </Pressable>
          
          <Pressable onPress={onClick.moreActions}>
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
            label='Editar contato'
            onClick={onClick.edit}
            Icon={() => <AntDesign name="edit" size={18} color="darkorange" />}
            borderless
            bgTransparent
            fontSize='XS'
          />

          <Button.Default
            label='Remover contato'
            onClick={onClick.remove}
            Icon={() => <AntDesign name="user-delete" size={18} color="darkorange" />}
            borderless
            bgTransparent
            fontSize='XS'
          />
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    gap: 8,
    borderColor: '#ffd484',
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff9ee',
  },
  
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: '50%',
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
    color: 'gray',
  },
  
  contact_more_options_container: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 'auto',
    marginRight: 10,
  },

  main_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  more_actions_container: {
    gap: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#ffd484',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  no_profile_photo: {
    width: 50,
    height: 50,
    borderRadius: '50%',
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

 