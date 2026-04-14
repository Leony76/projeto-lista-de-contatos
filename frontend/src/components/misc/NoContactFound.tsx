import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { View } from 'react-native'
import EmptyList from './EmptyList'
import { Button } from '../button';

type Props = {
  onNewContactClick: () => void;
};

const NoContactFound = ({ onNewContactClick }:Props): React.JSX.Element => {
  return (
    <View style={{ gap: 16, width: '67%', alignSelf: 'center' }}>
      <EmptyList message="Nenhum contato encontrado!" />

      <Button.Default
        label="Novo contato"
        onClick={onNewContactClick}
        Icon={() => <AntDesign name="user-add" size={18} color="darkorange" />}
      />
    </View>    
  )
}

export default NoContactFound