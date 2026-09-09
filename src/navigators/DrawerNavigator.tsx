import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
} from 'react-native';
import { useEffect, useRef } from 'react';

import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const imagen = require('../assets/images/vv.jpg');

export default function DrawerNavigator() {

    const pulse = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1.06,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulse]);

    return (
        <Drawer.Navigator

            screenOptions={{
                headerShown: true,

                headerStyle: {
                    backgroundColor: '#D90429',
                },

                headerTintColor: '#FFFFFF',

                headerTitleStyle: {
                    fontWeight: 'bold',
                },

                drawerActiveTintColor: '#D90429',
                drawerInactiveTintColor: '#666',

                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '600',
                },

                drawerStyle: {
                    width: 290,
                    backgroundColor: '#FFFFFF',
                },
            }}

            drawerContent={(props) => (
                <View style={styles.drawerContainer}>

                    {/* ENCABEZADO */}
                    <View style={styles.profileHeader}>

                        <Animated.View
                            style={[
                                styles.imageContainer,
                                {
                                    transform: [
                                        {
                                            scale: pulse,
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Image
                                source={imagen}
                                style={styles.profileImage}
                            />
                        </Animated.View>

                        <Text style={styles.appName}>
                            GymPro
                        </Text>

                        <Text style={styles.appSubtitle}>
                            Entrena • Progresa • Supera
                        </Text>

                    </View>

                    {/* MENÚ */}
                    <View style={styles.menuContainer}>

                        <DrawerItem
                            label="Configuración"
                            icon={({ color, size }) => (
                                <Ionicons
                                    name="settings-outline"
                                    size={size}
                                    color={color}
                                />
                            )}
                            focused={
                                props.state.routes[props.state.index].name ===
                                'Configuración'
                            }
                            activeTintColor="#D90429"
                            inactiveTintColor="#777"
                            onPress={() =>
                                props.navigation.navigate('Configuración')
                            }
                            style={styles.drawerItem}
                            labelStyle={styles.drawerLabel}
                        />

                        <DrawerItem
                            label="Mi Entrenamiento"
                            icon={({ color, size }) => (
                                <Ionicons
                                    name="fitness-outline"
                                    size={size}
                                    color={color}
                                />
                            )}
                            focused={
                                props.state.routes[props.state.index].name ===
                                'Mi Entrenamiento'
                            }
                            activeTintColor="#D90429"
                            inactiveTintColor="#777"
                            onPress={() =>
                                props.navigation.navigate('Mi Entrenamiento')
                            }
                            style={styles.drawerItem}
                            labelStyle={styles.drawerLabel}
                        />

                    </View>

                    {/* PIE */}
                    <View style={styles.footer}>

                        <Text style={styles.footerTitle}>
                            GYMPRO
                        </Text>

                        <Text style={styles.footerText}>
                            Versión 1.0.0
                        </Text>

                    </View>

                </View>
            )}

        >

            <Drawer.Screen
                name="Configuración"
                component={SettingsScreen}
            />

            <Drawer.Screen
                name="Mi Entrenamiento"
                component={TabNavigator}
            />

        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({

    drawerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    profileHeader: {
        backgroundColor: '#D90429',
        paddingTop: 55,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    imageContainer: {
        width: 105,
        height: 105,
        borderRadius: 53,
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginBottom: 14,
        elevation: 6,
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'contain',
    },

    appName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,
    },

    appSubtitle: {
        fontSize: 13,
        color: '#FFFFFF',
        marginTop: 6,
        textAlign: 'center',
        opacity: 0.9,
    },

    menuContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
    },

    drawerItem: {
        borderRadius: 14,
        marginVertical: 5,
    },

    drawerLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: -5,
    },

    footer: {
        marginTop: 'auto',
        padding: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    footerTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D90429',
    },

    footerText: {
        fontSize: 11,
        color: '#999',
        marginTop: 3,
    },

});