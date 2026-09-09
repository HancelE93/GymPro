import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

export type RootStackParamList = {
    Drawer: undefined;

    ChestDetail: {
        rutina: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator>

                {/* DRAWER PRINCIPAL */}
                <Stack.Screen
                    name="Drawer"
                    component={DrawerNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

                {/* DETALLE DE TODAS LAS RUTINAS */}
                <Stack.Screen
                    name="ChestDetail"
                    component={ChestDetailScreen}
                    options={({ route }) => ({
                        title: route.params.rutina,

                        headerStyle: {
                            backgroundColor: '#D90429',
                        },

                        headerTintColor: '#FFFFFF',

                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },

                        headerShadowVisible: false,
                    })}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}