import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatScreen from './app/Pages/ChatScreen';
import HomeScreen from './app/Pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './app/Navigation/HomeScreenNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <HomeNavigation/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
