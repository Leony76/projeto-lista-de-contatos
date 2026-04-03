import React, { useEffect, useState, useRef } from 'react'; 
import { Audio } from 'expo-av'; 
import { Modal, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { ModalType } from '.';
import { Contact } from '@/types/contact';
import Feather from '@expo/vector-icons/Feather';
import { generateRandomProfilePhotoPlaceholderBgColor } from '@/utils/generateRandomProfilePhotoPlaceholderBgColor';
import { formatTime } from '@/utils/formatTime';


type Props = ModalType & {
  contact: Contact;
};

const Calling = ({
  visible,
  onRequestClose,
  contact,
}:Props) => {

  const [seconds, setSeconds] = useState<number>(0);
  const [isCalling, setIsCalling] = useState<boolean>(true);
  const [callEnded, setCallEnded] = useState<boolean>(false);

  const soundMap: Record<number, any> = {
    1: require('../../../assets/audio/Cloude_Strife.mp3'),
    2: require('../../../assets/audio/Mad_max.mp3'),
    3: require('../../../assets/audio/Nathan_drake.mp3'),
  };

  const soundRef = useRef<Audio.Sound | null>(null);

  const playSound = async(
    forcedCallingState? : boolean
  ):Promise<void> => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const currentlyCalling = forcedCallingState !== undefined ? forcedCallingState : isCalling;

      let source;

      if (currentlyCalling) {
        source = require('../../../assets/audio/Calling.mp3');
      } else {
        source = soundMap[contact.id] || require('../../../assets/audio/Any_contact.mp3');
      }

      const { sound } = await Audio.Sound.createAsync(source);
      soundRef.current = sound;
      
      await sound.setIsLoopingAsync(true);
      await sound.playAsync();
    } catch (error:unknown) {
      console.error("Erro ao tocar áudio", error);
    }
  }

  const stopSound = async():Promise<void> => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }

  useEffect(() => {
    if (visible) {
      setIsCalling(true);
      setSeconds(0);
      setCallEnded(false);
    } else {
      stopSound();
    }
  }, [visible]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;

    if (visible && !callEnded) {
      if (isCalling) {
        playSound(true); 

        interval = setTimeout(() => {
          setIsCalling(false);
          playSound(false); 
        }, 7000);
      } else {
        interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
      }
    }

    if (callEnded) {
      stopSound(); 
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
        clearInterval(interval);
      }
    };
  }, [visible, isCalling, callEnded]);

  if (!contact) return null;

  const backgroundColorPlaceholder = generateRandomProfilePhotoPlaceholderBgColor(contact.name);

  return (
    <Modal
    visible={visible}
    onRequestClose={onRequestClose}
    animationType='slide'
    transparent
    >
      <View style={style.modal_overlay}>
        <View style={style.upper_container}>
          <Text style={style.call_timing}>
            {isCalling && !callEnded
              ? 'Ligando...' 
              : callEnded
                ? 'Encerrado'
                : formatTime(seconds)
            }
          </Text>
          
          { callEnded && 
            <Text style={{ color: 'darkorange' }}>
              { formatTime(seconds) }
            </Text>
          }

          <Text style={style.contact_name}>
            { contact.name.trim().length > 20
              ? contact.name.slice(0,20) + '...' 
              : contact.name 
            }
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

          <Text style={style.contact_phone}>
            { contact.phone }
          </Text>
        </View>

        <View style={style.lower_container}>
          { !callEnded ? (
            <Pressable 
            onPress={() => setCallEnded(true)}
            style={({ pressed }) => [
              { 
                padding: 16,
                transform: [{ scale: pressed ? 0.9 : 1 }],
                backgroundColor: pressed ? '#ffe2e2' : 'transparent',
                borderRadius: 50,
              }
            ]}
            >
              <Feather 
                name="phone-off" 
                size={32} 
                color="red" 
              />
            </Pressable>
          ) : (
            <View style={style.call_again_or_end_call_container}>
              <Pressable 
              onPress={onRequestClose}
              style={({ pressed }) => [
                { 
                  padding: 16,
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                  backgroundColor: pressed ? '#ffe2e2' : 'transparent',
                  borderRadius: 50,
                }
              ]}
              >
                <Feather 
                  name="phone-missed" 
                  size={32} 
                  color="red" 
                />
              </Pressable>

              <Pressable 
              onPress={() => {
                setCallEnded(false);
                setIsCalling(true);
                setSeconds(0);
              }}
              style={({ pressed }) => [
                { 
                  padding: 16,
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                  backgroundColor: pressed ? '#d7ffca' : 'transparent',
                  borderRadius: 50,
                }
              ]}
              >
                <Feather 
                  name="phone-call" 
                  size={32} 
                  color="green" 
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modal_overlay: {
    backgroundColor: '#fff9ee',
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

  profile_image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'orange',
  },

  no_profile_photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'orange',
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
    color: 'orange',
  },

  call_timing: {
    color: 'darkorange',
    fontSize: 15
  },

  contact_phone: {
    color: 'darkorange',
    fontWeight: 600,
    fontSize: 16,
    marginTop: 10,
  },

  call_again_or_end_call_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});

export default Calling