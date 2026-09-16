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

    const pulse = useRef(
        new Animated.Value(1)
    ).current;

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

                drawerActiveTintColor: '#FFFFFF',
                drawerInactiveTintColor: '#A7A7A7',

                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '700',
                },

                drawerStyle: {
                    width: 290,
                    backgroundColor: '#050505',
                },
            }}

            drawerContent={(props) => {

                const currentRoute =
                    props.state.routes[props.state.index].name;

                return (
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

                            <Text style={styles.menuTitle}>
                                MENÚ PRINCIPAL
                            </Text>

                            {/* CONFIGURACIÓN */}
                            <View
                                style={[
                                    styles.menuItemContainer,
                                    currentRoute === 'Configuración' &&
                                    styles.menuItemActive,
                                ]}
                            >

                                <DrawerItem
                                    label="Configuración"
                                    icon={({ color, size }) => (
                                        <Ionicons
                                            name={
                                                currentRoute === 'Configuración'
                                                    ? 'settings'
                                                    : 'settings-outline'
                                            }
                                            size={size}
                                            color={color}
                                        />
                                    )}
                                    focused={
                                        currentRoute === 'Configuración'
                                    }
                                    activeTintColor="#FFFFFF"
                                    inactiveTintColor="#A7A7A7"
                                    onPress={() =>
                                        props.navigation.navigate(
                                            'Configuración'
                                        )
                                    }
                                    style={styles.drawerItem}
                                    labelStyle={styles.drawerLabel}
                                />

                            </View>

                            {/* MI ENTRENAMIENTO */}
                            <View
                                style={[
                                    styles.menuItemContainer,
                                    currentRoute === 'Mi Entrenamiento' &&
                                    styles.menuItemActive,
                                ]}
                            >

                                <DrawerItem
                                    label="Mi Entrenamiento"
                                    icon={({ color, size }) => (
                                        <Ionicons
                                            name={
                                                currentRoute === 'Mi Entrenamiento'
                                                    ? 'fitness'
                                                    : 'fitness-outline'
                                            }
                                            size={size}
                                            color={color}
                                        />
                                    )}
                                    focused={
                                        currentRoute === 'Mi Entrenamiento'
                                    }
                                    activeTintColor="#FFFFFF"
                                    inactiveTintColor="#A7A7A7"
                                    onPress={() =>
                                        props.navigation.navigate(
                                            'Mi Entrenamiento'
                                        )
                                    }
                                    style={styles.drawerItem}
                                    labelStyle={styles.drawerLabel}
                                />

                            </View>

                        </View>

                        {/* SEPARADOR */}
                        <View style={styles.separator} />

                        {/* CONSEJO */}
                        <View style={styles.tipCard}>

                            <View style={styles.tipIcon}>

                                <Ionicons
                                    name="flash"
                                    size={21}
                                    color="#D90429"
                                />

                            </View>

                            <View style={styles.tipContent}>

                                <Text style={styles.tipTitle}>
                                    MANTENTE CONSTANTE
                                </Text>

                                <Text style={styles.tipText}>
                                    Cada entrenamiento cuenta.
                                </Text>

                            </View>

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
                );
            }}

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

    /* CONTENEDOR */
    drawerContainer: {
        flex: 1,
        backgroundColor: '#050505',
    },

    /* CABECERA */
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
        elevation: 7,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'contain',
    },

    appName: {
        fontSize: 29,
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

    /* MENÚ */
    menuContainer: {
        paddingTop: 22,
        paddingHorizontal: 12,
    },

    menuTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#777777',
        letterSpacing: 1.2,
        marginLeft: 12,
        marginBottom: 10,
    },

    menuItemContainer: {
        borderRadius: 15,
        marginBottom: 7,
        overflow: 'hidden',
    },

    menuItemActive: {
        backgroundColor: '#D90429',
    },

    drawerItem: {
        marginVertical: 0,
        borderRadius: 15,
    },

    drawerLabel: {
        fontSize: 15,
        fontWeight: '700',
        marginLeft: -5,
    },

    /* SEPARADOR */
    separator: {
        height: 1,
        backgroundColor: '#252525',
        marginHorizontal: 18,
        marginTop: 18,
    },

    /* CONSEJO */
    tipCard: {
        marginHorizontal: 18,
        marginTop: 18,
        padding: 13,
        backgroundColor: '#121212',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#292929',
        flexDirection: 'row',
        alignItems: 'center',
    },

    tipIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 11,
    },

    tipContent: {
        flex: 1,
    },

    tipTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 0.5,
    },

    tipText: {
        fontSize: 11,
        color: '#999999',
        marginTop: 4,
    },

    /* PIE */
    footer: {
        marginTop: 'auto',
        paddingVertical: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#252525',
    },

    footerTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    footerText: {
        fontSize: 11,
        color: '#777777',
        marginTop: 4,
    },

});