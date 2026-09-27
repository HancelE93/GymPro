import React, { useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Switch,
    Pressable,
    Image,
    Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const imagen = require('../assets/images/vv.jpg');

export default function SettingsScreen() {

    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(true);
    const [sounds, setSounds] = React.useState(true);

    const pulse = useRef(
        new Animated.Value(1)
    ).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([

                Animated.timing(pulse, {
                    toValue: 1.03,
                    duration: 1200,
                    useNativeDriver: true,
                }),

                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),

            ])
        ).start();

    }, [pulse]);

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* IMAGEN PRINCIPAL */}

                <Animated.View
                    style={[
                        styles.imageContainer,
                        {
                            transform: [{ scale: pulse }],
                        },
                    ]}
                >

                    <Image
                        source={imagen}
                        style={styles.headerImage}
                    />

                </Animated.View>

                {/* MARCA */}

                <View style={styles.brandSection}>

                    <View style={styles.brandIcon}>

                        <Ionicons
                            name="barbell"
                            size={20}
                            color="#FFFFFF"
                        />

                    </View>

                    <View>

                        <Text style={styles.brandText}>
                            GYMPRO
                        </Text>

                        <Text style={styles.brandSubtitle}>
                            Hancel Espin
                        </Text>

                    </View>

                </View>

                {/* ENCABEZADO */}

                <View style={styles.headerCard}>

                    <View style={styles.headerIcon}>

                        <Ionicons
                            name="settings-outline"
                            size={28}
                            color="#FFFFFF"
                        />

                    </View>

                    <View style={styles.headerInfo}>

                        <Text style={styles.title}>
                            Configuración
                        </Text>

                        <Text style={styles.subtitle}>
                            Personaliza tu experiencia en GymPro
                        </Text>

                    </View>

                </View>

                {/* PERFIL */}

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Perfil
                    </Text>

                </View>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="person-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Mi perfil
                        </Text>

                        <Text style={styles.optionDescription}>
                            Administra tu información personal
                        </Text>

                    </View>

                    <View style={styles.arrowBox}>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#888888"
                        />

                    </View>

                </Pressable>

                {/* PREFERENCIAS */}

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <View>

                        <Text style={styles.sectionTitle}>
                            Preferencias
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Personaliza cómo funciona la aplicación
                        </Text>

                    </View>

                </View>

                {/* NOTIFICACIONES */}

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="notifications-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Notificaciones
                        </Text>

                        <Text style={styles.optionDescription}>
                            Recordatorios de entrenamiento
                        </Text>

                    </View>

                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{
                            false: '#333333',
                            true: '#6E061B',
                        }}
                        thumbColor={
                            notifications
                                ? '#D90429'
                                : '#888888'
                        }
                    />

                </View>

                {/* MODO OSCURO */}

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="moon-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Modo oscuro
                        </Text>

                        <Text style={styles.optionDescription}>
                            Cambia la apariencia de la aplicación
                        </Text>

                    </View>

                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{
                            false: '#333333',
                            true: '#6E061B',
                        }}
                        thumbColor={
                            darkMode
                                ? '#D90429'
                                : '#888888'
                        }
                    />

                </View>

                {/* SONIDOS */}

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="volume-high-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Sonidos
                        </Text>

                        <Text style={styles.optionDescription}>
                            Sonidos durante el entrenamiento
                        </Text>

                    </View>

                    <Switch
                        value={sounds}
                        onValueChange={setSounds}
                        trackColor={{
                            false: '#333333',
                            true: '#6E061B',
                        }}
                        thumbColor={
                            sounds
                                ? '#D90429'
                                : '#888888'
                        }
                    />

                </View>

                {/* ENTRENAMIENTO */}

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <View>

                        <Text style={styles.sectionTitle}>
                            Entrenamiento
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Configura tus objetivos
                        </Text>

                    </View>

                </View>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="time-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Duración del entrenamiento
                        </Text>

                        <Text style={styles.optionDescription}>
                            Configura el tiempo de tus sesiones
                        </Text>

                    </View>

                    <View style={styles.arrowBox}>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#888888"
                        />

                    </View>

                </Pressable>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="trophy-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Objetivo semanal
                        </Text>

                        <Text style={styles.optionDescription}>
                            Define cuántos días quieres entrenar
                        </Text>

                    </View>

                    <View style={styles.arrowBox}>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#888888"
                        />

                    </View>

                </Pressable>

                {/* APLICACIÓN */}

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <View>

                        <Text style={styles.sectionTitle}>
                            Aplicación
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Información de GymPro
                        </Text>

                    </View>

                </View>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>

                        <Ionicons
                            name="information-circle-outline"
                            size={23}
                            color="#D90429"
                        />

                    </View>

                    <View style={styles.info}>

                        <Text style={styles.optionTitle}>
                            Acerca de GymPro
                        </Text>

                        <Text style={styles.optionDescription}>
                            Información sobre la aplicación
                        </Text>

                    </View>

                    <View style={styles.arrowBox}>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#888888"
                        />

                    </View>

                </Pressable>

                {/* PIE */}

                <View style={styles.footer}>

                    <View style={styles.footerLine} />

                    <View style={styles.footerBrand}>

                        <View style={styles.footerIcon}>

                            <Ionicons
                                name="barbell"
                                size={15}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.footerTitle}>
                            GYMPRO
                        </Text>

                    </View>

                    <Text style={styles.version}>
                        Versión 1.0.0
                    </Text>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    /* CONTENEDOR */

    container: {
        flex: 1,
        backgroundColor: '#070707',
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 35,
    },

    /* IMAGEN */

    imageContainer: {
        width: '100%',
        height: 165,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: '#111111',
        borderWidth: 1,
        borderColor: '#292929',
        marginBottom: 15,
    },

    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    /* MARCA */

    brandSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 17,
        paddingHorizontal: 3,
    },

    brandIcon: {
        width: 39,
        height: 39,
        borderRadius: 12,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    brandText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    brandSubtitle: {
        fontSize: 11,
        color: '#777777',
        marginTop: 1,
    },

    /* ENCABEZADO */

    headerCard: {
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#292929',
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    headerInfo: {
        flex: 1,
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    subtitle: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4,
        lineHeight: 17,
    },

    /* SECCIONES */

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 11,
    },

    redIndicator: {
        width: 5,
        height: 30,
        borderRadius: 3,
        backgroundColor: '#D90429',
        marginRight: 10,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    sectionSubtitle: {
        fontSize: 11,
        color: '#777777',
        marginTop: 2,
    },

    /* OPCIONES */

    optionCard: {
        backgroundColor: '#121212',
        borderRadius: 18,
        padding: 13,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#292929',

        elevation: 4,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
        borderWidth: 1,
        borderColor: '#450B16',
    },

    info: {
        flex: 1,
        paddingRight: 8,
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    optionDescription: {
        fontSize: 11,
        color: '#929292',
        marginTop: 4,
        lineHeight: 17,
    },

    /* FLECHA */

    arrowBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#1D1D1D',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* FOOTER */

    footer: {
        alignItems: 'center',
        marginTop: 25,
    },

    footerLine: {
        width: '35%',
        height: 1,
        backgroundColor: '#292929',
        marginBottom: 15,
    },

    footerBrand: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    footerIcon: {
        width: 27,
        height: 27,
        borderRadius: 8,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7,
    },

    footerTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    version: {
        color: '#666666',
        fontSize: 10,
        marginTop: 5,
    },

});