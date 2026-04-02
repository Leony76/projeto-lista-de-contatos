import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { CONTACTS } from "@/datas/contact";
import { Select } from "@/components/select";
import { useState } from "react";
import { Contact } from "@/types/contact";
import { ContactFilterValue } from "@/types/contactFIlterValue";



export default function Index() {

  const [filteredData, setFilteredData] = useState<Contact | null>(null);
  const [filterValue, setFilterValue] = useState<ContactFilterValue | null>(null);

  return (
    <LinearGradient
    colors={['#fff9ee', '#ff9d0029']}
    style={{ flex: 1 }}
    >
      <View style={style.header_container}>
        <Text style={style.header_title}>
          O que há na aplicação
        </Text>
      </View>
      
      <View style={style.body_container}>
        <View style={style.search_input_and_filter_select_container}>
          <Input.Search 
            customStyle={{ flex: 2 }}
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
            data={CONTACTS}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <Card.Contact { ...item } />
            )}
          />  
        </View>
      </View>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  header_container: {
    backgroundColor: 'white',
    borderBottomColor: '#ffe19476',
    borderBottomWidth: 2,
    padding: 15,
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
});
