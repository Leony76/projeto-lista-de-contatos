import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from "@/types/contact";
import { CONTACTS as initialData } from "@/datas/contact";

export class ContactService {

  private static readonly STORAGE_KEY: string = '@my_contacts';

  static async create(
    newContact: Omit<Contact, 'id'>
  ): Promise<Contact[]> {

    const contacts: Contact[] = await this.read();

    const id: number = contacts.length > 0 
      ? Math.max(...contacts.map(contact => contact.id)) + 1 
      : 1
    ;
    
    const newEntry: Contact = { ...newContact, id };

    const payload: Contact[] = [
      ...contacts, 
      newEntry,
    ];

    await AsyncStorage.setItem(
      this.STORAGE_KEY, 
      JSON.stringify(payload),
    );

    return payload;
  };

  static async read(): Promise<Contact[]> {

    const data: string | null = await AsyncStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      await AsyncStorage.setItem(
        this.STORAGE_KEY, 
        JSON.stringify(initialData)
      );

      return initialData;
    }

    return JSON.parse(data);
  };

  static async update(
    id          : number,
    updatedData: Partial<Contact>
  ): Promise<Contact[]> {

    const contacts: Contact[] = await this.read();

    const payload: Contact[] = contacts.map(contact => 
      contact.id === id 
        ? { ...contact, ...updatedData } 
        : contact
    );

    await AsyncStorage.setItem(
      this.STORAGE_KEY, 
      JSON.stringify(payload),
    );

    return payload;
  };

  static async delete(
    id : number
  ): Promise<Contact[]> {
    const contacts: Contact[] = await this.read();

    const remainingContacts: Contact[] = contacts.filter(contact => contact.id !== id);

    await AsyncStorage.setItem(
      this.STORAGE_KEY, 
      JSON.stringify(remainingContacts),
    );

    return remainingContacts;
  };
};