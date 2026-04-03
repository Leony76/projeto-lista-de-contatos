import { Card } from "@/components/card";
import { Contact } from "@/types/contact";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { Select } from "@/components/select";
import { HomeModals } from "@/types/activeModal";
import { LinearGradient } from "expo-linear-gradient";
import { ContactService } from "@/services/contactService";
import { useFilterContacts } from "@/hooks/useFilterContact";
import { ContactFilterValue } from "@/types/contactFIlterValue";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import EmptyList from "@/components/misc/EmptyList";
import Entypo from '@expo/vector-icons/Entypo';

export default function Index() {

  const [contacts, setContacts] = useState<Contact[] | null>([]);
  const [contactToBeEdit, setContactToBeEdit] = useState<Omit<Contact, 'profilePhoto'> | null>(null);
  const [contactToBeCalled, setContactToBeCalled] = useState<Contact | null>(null);

  const [activeModal, setActiveModal] = useState<HomeModals | null>();
  const [moreOptions, setMoreOptions] = useState<number | null>(null);
     
  const [filterValue, setFilterValue] = useState<ContactFilterValue | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const filteredContacts = contacts ? useFilterContacts(
    contacts,
    filterValue,
    searchValue,
  ) : [];

  const loadData = async():Promise<void> => {
    try {
      const data = await ContactService.read();

      setContacts(data);
    } catch (error:any) {
      console.error('Houve um erro ao carregar os contatos: ' + error);
    }
  };

  useEffect(() => {
    loadData();
  },[]);

  const handleRemoveContact = async(
    id : number
  ):Promise<void> => {
    try {
      if (!id) return;

      await ContactService.delete(id);

      loadData();
    } catch (error:unknown) {
      console.error(error);
    }
  };

  return (
    <>
    <Modal.Form.NewContact
      visible={activeModal === 'NEW_CONTACT'}
      onRequestClose={() => setActiveModal(null)}
      onSuccess={() => loadData()}
    />

    <Modal.Form.EditContact
      visible={activeModal === 'EDIT_CONTACT'}
      onRequestClose={() => setActiveModal(null)}
      onSuccess={() => loadData()}
      contact={contactToBeEdit!}
    />

    <Modal.Calling
      visible={activeModal === 'CALLING'}
      onRequestClose={() => setActiveModal(null)}
      contact={contactToBeCalled!}
    />

    <LinearGradient
    colors={['#fff9ee', '#ff9d0029']}
    style={{ flex: 1 }}
    >
      <View style={style.header_container}>
        <Text style={style.header_title}>
          O que há na aplicação
        </Text>

        <View>
          <Pressable onPress={() => setActiveModal(prev => prev ? null : 'MORE_OPTIONS')}>
            <Entypo 
              name="dots-three-vertical" 
              size={24} 
              color={activeModal === 'MORE_OPTIONS' ? '#ffc472' : 'darkorange'} 
            />
          </Pressable>
          
          <Modal.MoreActions
            visible={activeModal === "MORE_OPTIONS"}
            onRequestClose={() => setActiveModal(null)}
            buttons={[{ 
              label   : 'Novo contato', 
              Icon    : () => <AntDesign name="user-add" size={18} color="darkorange" />,
              onClick : () => {
                setActiveModal(null); 
                setTimeout(() => setActiveModal('NEW_CONTACT'), 100);
              },          
            }]}
          />
        </View>
      </View>
      
      <View style={style.body_container}>
        <View style={style.search_input_and_filter_select_container}>
          <Input.Search 
            customStyle={{ flex: 2 }}
            onClearSearch={() => setSearchValue(null)}
            onChange={(text) => setSearchValue(text)}
            value={searchValue}
          />

          <Select.Filter 
            iconOnly
            optionsSchema="CONTACT"
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        </View>
        
        <View style={style.contact_list_container}>
          <FlatList
            style={{ borderRadius: 28 }}       
            data={filteredContacts}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ gap: 8 }}
            ListEmptyComponent={<EmptyList message="Nenhum contato encontrado!" />}
            renderItem={({ item }) => (
              <Card.Contact 
                { ...item } 
                moreActionsVisible={item.id === moreOptions}
                onClick={{
                  moreActions : () => setMoreOptions(prev => prev === item.id ? null : item.id),
                  remove      : () => handleRemoveContact(item.id),
                  call        : () => {
                    setContactToBeCalled(item);
                    setTimeout(() => setActiveModal("CALLING"), 1000);
                  },
                  edit        : () => {
                    setContactToBeEdit(item);
                    setActiveModal('EDIT_CONTACT');
                  },
                }}
              />
            )}
          />  
        </View>
      </View>
    </LinearGradient>
    </>
  );
}

const style = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomColor: '#ffe19476',
    borderBottomWidth: 2,
    padding: 15,
    zIndex: 1,
  },

  header_title: {
    color: 'darkorange',
    fontWeight: 700,
    fontSize: 20,
  },

  body_container: {
    padding: 10,
    gap: 8,
    flex: 1,
  },

  contact_list_container: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
    borderColor: '#ffe194d3',
    borderWidth: 1,
    flex: 1,
    gap: 8,
  },

  search_input_and_filter_select_container: {
    flexDirection: 'row',
    gap: 8,
  },

  floating_menu: {
    position: 'absolute',
    top: 60,              
    right: 15,            
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,        
    
    elevation: 5,
    shadowColor: 'darkorange',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  modal_overlay: {
    flex: 1,
  },
});
