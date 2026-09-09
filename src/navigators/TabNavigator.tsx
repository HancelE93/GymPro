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

                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: '#8A8A8A',

                tabBarStyle: {
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 10,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },

                tabBarIcon: ({ focused, color, size }) => {

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
                            size={size}
                            color={color}
                        />
                    );
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