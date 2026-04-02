import { Contact as ContactType } from '@/types/contact';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = ContactType;

const Contact = ({
  name,
  phone,
  profilePhoto
}:Props) => {
  return (
    <View style={style.container}>
      <Image 
        style={style.profile_image}
        source={
          typeof profilePhoto === "string"
          ? { uri: profilePhoto }
          : profilePhoto
        }
      />

      <View style={style.contact_name_and_phone_container}>
        <Text style={style.contact_name_text}>
          { name }
        </Text>

        <Text style={style.contact_phone_text}>
          { phone }
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ffd484',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
});

export default Contact