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

import ApplicationLoadingView from "@/components/misc/ApplicationLoadingView";
import NoContactFound from "@/components/misc/NoContactFound";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index(): React.JSX.Element {

  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [contactToBeEdit, setContactToBeEdit] = useState<Contact | null>(null);
  const [contactToBeRemovedId, setContactToBeRemovedId] = useState<number | null>(null);
  const [contactToBeCalled, setContactToBeCalled] = useState<Contact | null>(null);

  const [activeModal, setActiveModal] = useState<HomeModals | null>(null);
  const [moreOptions, setMoreOptions] = useState<number | null>(null);
     
  const [filterValue, setFilterValue] = useState<ContactFilterValue | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const filteredContacts: Contact[] = contacts ? useFilterContacts(
    contacts,
    filterValue,
    searchValue,
  ) : [];

  const loadData = async(): Promise<void> => {
    try {
      const data: Contact[] = await ContactService.read();

      setContacts(data);
      setLoadingPage(false);
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.error('Houve um erro ao carregar os contatos: ' + error.message);
      }
    }
  };

  const handleRemoveContact = async(
    id : number
  ):Promise<void> => {
    try {
      if (!id) return;

      const updatedList: Contact[] = await ContactService.delete(id);

      setContacts(updatedList);
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.error('Houve um erro ao remover o contato: ' + error.message);
      }
    }
  };

  useEffect(() => {
    loadData();
  },[]);

  if (loadingPage) return <ApplicationLoadingView/>;

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

    <Modal.ConfirmAction
      visible={activeModal === 'REMOVE_CONTACT_CONFIRM'}
      confirmMessage="Tem certeza em remover este contato ?"
      onRequestClose={() => setActiveModal(null)}
      onClick={{
        confirm : () => {
          handleRemoveContact(contactToBeRemovedId!);
          setActiveModal(null);
        },
        cancel  : () => {
          setContactToBeRemovedId(null);
          setActiveModal(null);
        },
      }}
    />

    <LinearGradient
    colors={['#fff9ee', '#ff9d0029']}
    style={{ flex: 1 }}
    >
      <View style={style.header_container}>
        <Text style={style.header_title}>
          O que há na aplicação
        </Text>

        { filteredContacts.length > 0 && (
          <Pressable 
          onPress={() => setActiveModal('NEW_CONTACT')}
          style={({ pressed }) => [
            style.header_new_contact_button,
            {
              filter    : [{ brightness: pressed ? 1.2 : 1 }],
              transform : [{ scale: pressed ? 0.9 : 1 }],
            }
          ]}
          >
            <AntDesign 
              name="user-add"
              size={20} 
              color="orange" 
            />
          </Pressable>      
        )}
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
        
        <Pressable 
        style={style.contact_list_container}
        onPress={() => setMoreOptions(null)}
        >
          <FlatList
            style={{ borderRadius: 28 }}       
            data={filteredContacts}
            keyExtractor={(item, index) => `${item.id} - ${index}`}
            contentContainerStyle={{ gap: 8 }}
            ListEmptyComponent={ <NoContactFound onNewContactClick={() => setActiveModal('NEW_CONTACT')}/> }
            renderItem={({ item }) => (
              <Card.Contact 
                { ...item } 
                moreActionsVisible={item.id === moreOptions}
                onClick={{
                  moreActions : () => setMoreOptions(prev => prev === item.id ? null : item.id),
                  remove      : () => {
                    setContactToBeRemovedId(item.id);
                    setActiveModal("REMOVE_CONTACT_CONFIRM")
                  },
                  call : () => {
                    setContactToBeCalled(item);
                    setTimeout(() => setActiveModal("CALLING"), 500);
                  },
                  edit : () => {
                    setContactToBeEdit(item);
                    setActiveModal("EDIT_CONTACT");
                  },
                }}
              />
            )}
          />  
        </Pressable>
      </View>
    </LinearGradient>
    </>
  );
}

const style = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#ffe19476',
    borderBottomWidth: 2,
    padding: 15,
    zIndex: 1,
  },

  header_new_contact_button: {
    backgroundColor: '#fff9ee',
    borderRadius: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: 'orange'
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


