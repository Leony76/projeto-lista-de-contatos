import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ffd484',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  input: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    color: 'darkorange',
    flex: 1,
    minWidth: 1,
  },
});