import { Contact } from "@/types/contact";

export const CONTACTS: Contact[] = [
  { 
    id: 1, 
    name: 'Cloud Strife', 
    phone: '+81 (3) 122-7632', 
    profilePhoto: require('../../assets/images/Cloud_Strife.avif')
  },
  { 
    id: 2, 
    name: 'Max', 
    phone: '+61 (122) 233-443', 
    profilePhoto: require('../../assets/images/Max.jpg')
  },
  { 
    id: 3, 
    name: 'Nathan Drake', 
    phone: '+1 (323) 555-5639', 
    profilePhoto: require('../../assets/images/Nathan_Drake.webp')
  },
];