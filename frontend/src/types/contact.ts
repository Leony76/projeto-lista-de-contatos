import { ImageSourcePropType } from "react-native";

export type Contact = {
  id           : number;
  name         : string;
  phone        : string;
  profilePhoto : ImageSourcePropType | string;
};