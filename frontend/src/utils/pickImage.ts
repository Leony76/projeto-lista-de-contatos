import { Contact } from '@/types/contact';
import * as ImagePicker from 'expo-image-picker';

export const pickImage = async(
  setNewData: React.Dispatch<React.SetStateAction<Omit<Contact, "id">>>,
): Promise<void> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    window.alert('Precisamos de permissão para acessar suas fotos!');
    return;
  };

  const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, 
    aspect: [1, 1],
    quality: 0.5, 
    base64: true, 
  });

  if (!result.canceled) {
    const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
    
    setNewData(prev => ({ ...prev, profilePhoto: base64Image }));
  }
};