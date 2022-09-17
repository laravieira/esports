import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Game } from '../screens/Game';
import { StyleSheet } from 'react-native';

const { Navigator, Screen } = createNativeStackNavigator();

const appStyles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});

export const HOME = 'home';
export const GAME = 'game';

export function AppRoutes() {
    return (
        <Navigator  screenOptions={{ headerShown: false, contentStyle: appStyles.container }}>
            <Screen name={ HOME } component={ Home }/>
            <Screen name={ GAME } component={ Game }/>
        </Navigator>
    );
}