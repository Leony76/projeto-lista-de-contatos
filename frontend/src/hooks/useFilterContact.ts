import { Contact } from "@/types/contact";
import { ContactFilterValue } from "@/types/contactFIlterValue";
import { useMemo } from "react";

export const useFilterContacts = (
  contacts    : Contact[],
  filterValue : ContactFilterValue | null,
  searchValue : string | null,
): Contact[] => {

  return useMemo(() => {
    const result: Contact[] = contacts.filter((contact) => {
      if (!searchValue) return true;
      
      const search = searchValue.toLowerCase();

      const searchByName = contact.name.toLowerCase().includes(search);
      const searchByPhone = contact.phone.includes(search);

      return searchByName || searchByPhone;
    });

    return result.sort((a, b) => {
      switch (filterValue) {
        case "mostOldAdded":
          return a.id - b.id;
        default:
          return b.id - a.id;
      }
    });
  }, [filterValue, contacts, searchValue]);
};