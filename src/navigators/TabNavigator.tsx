import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

type TabParamList = {
    Progreso: undefined;
    Rutinas: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                headerShown: false,

                /* COLORES */
                tabBarActiveTintColor: '#D90429',
                tabBarInactiveTintColor: '#777777',

                /* BARRA INFERIOR */
                tabBarStyle: {
                    height: 68,
                    paddingBottom: 8,
                    paddingTop: 7,
                    backgroundColor: '#FFFFFF',

                    borderTopWidth: 1,
                    borderTopColor: '#E5E5E5',

                    elevation: 12,

                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.12,
                    shadowRadius: 5,
                },

                /* TEXTO */
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '800',
                    marginTop: 1,
                },

                /* ICONOS */
                tabBarIcon: ({
                    focused,
                    color,
                    size,
                }) => {

                    let iconName: any;

                    if (route.name === 'Progreso') {
                        iconName = focused
                            ? 'stats-chart'
                            : 'stats-chart-outline';
                    }

                    if (route.name === 'Rutinas') {
                        iconName = focused
                            ? 'barbell'
                            : 'barbell-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    );
                },

                /* EFECTO AL TOCAR */
                tabBarItemStyle: {
                    borderRadius: 15,
                    marginHorizontal: 8,
                    marginVertical: 4,
                },

            })}
        >

            <Tab.Screen
                name="Progreso"
                component={ProgressScreen}
            />

            <Tab.Screen
                name="Rutinas"
                component={RoutineListScreen}
            />

        </Tab.Navigator>
    );
}