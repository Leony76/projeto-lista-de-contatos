import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <LinearGradient
    colors={['#fff5e5', '#ff9d0029']}
    style={{ flex: 1 }}
    >
      <View style={style.header_container}>
        <Text style={style.header_title}>
          O que há em cima
        </Text>
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
    color: '#e4a400',
    fontWeight: 700,
    fontSize: 20,
    textShadowColor: "#b36b005b",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
