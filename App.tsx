import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';

import RoutineProvider from './src/context/RoutineContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <RoutineProvider>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen
                        name="Drawer"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Detail"
                        component={RoutineDetailScreen}
                        options={{
                            title: 'Detalle de Rutina',
                            headerStyle: {
                                backgroundColor: '#D90429',
                            },
                            headerTintColor: '#FFFFFF',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerShadowVisible: false,
                        }}
                    />

                    <Stack.Screen
                        name="AddRoutine"
                        component={AddRoutineScreen}
                        options={{
                            title: 'Nueva Rutina',
                            headerStyle: {
                                backgroundColor: '#D90429',
                            },
                            headerTintColor: '#FFFFFF',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerShadowVisible: false,
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </RoutineProvider>
    );
}