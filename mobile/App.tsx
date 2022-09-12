import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ButtonProps {
  display: String;
}

function Button(props: ButtonProps) {
  return (
      <TouchableOpacity>
        <Text>{ props.display }</Text>
      </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button display="Button 1" />
      <Button display="Button 2" />
      <Button display="Button 3" />
      <Button display="Button 3" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'purple',
    fontSize: 38
  }
});
