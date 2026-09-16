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
    Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const imagen = require('../assets/images/vv.jpg');

const { width } = Dimensions.get('window');

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

                {/* IMAGEN */}
                <Animated.View
                    style={{
                        transform: [{ scale: pulse }],
                    }}
                >
                    <Image
                        source={imagen}
                        style={styles.headerImage}
                    />
                </Animated.View>

                {/* ENCABEZADO */}
                <View style={styles.headerInfo}>

                    <Text style={styles.appName}>
                        GymPro Hancel Espin
                    </Text>

                    <Text style={styles.appSubtitle}>
                        Tu mejor versión comienza hoy
                    </Text>

                </View>

                {/* TÍTULO */}
                <View style={styles.titleContainer}>

                    <View style={styles.titleIcon}>
                        <Ionicons
                            name="settings-outline"
                            size={28}
                            color="#FFFFFF"
                        />
                    </View>

                    <View>
                        <Text style={styles.title}>
                            Configuración
                        </Text>

                        <Text style={styles.subtitle}>
                            Personaliza tu experiencia en GymPro
                        </Text>
                    </View>

                </View>

                {/* PERFIL */}
                <Text style={styles.sectionTitle}>
                    Perfil
                </Text>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="person-outline"
                            size={24}
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

                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color="#AAAAAA"
                    />

                </Pressable>

                {/* PREFERENCIAS */}
                <Text style={styles.sectionTitle}>
                    Preferencias
                </Text>

                {/* NOTIFICACIONES */}
                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
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
                            size={24}
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
                            size={24}
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
                <Text style={styles.sectionTitle}>
                    Entrenamiento
                </Text>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="time-outline"
                            size={24}
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

                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color="#AAAAAA"
                    />

                </Pressable>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="trophy-outline"
                            size={24}
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

                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color="#AAAAAA"
                    />

                </Pressable>

                {/* APLICACIÓN */}
                <Text style={styles.sectionTitle}>
                    Aplicación
                </Text>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="information-circle-outline"
                            size={24}
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

                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color="#AAAAAA"
                    />

                </Pressable>

                {/* PIE */}
                <View style={styles.footer}>

                    <View style={styles.footerLine} />

                    <Text style={styles.footerTitle}>
                        GYMPRO
                    </Text>

                    <Text style={styles.version}>
                        Versión 1.0.0
                    </Text>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 35,
    },

    headerImage: {
        width: '100%',
        height: 165,
        borderRadius: 22,
        marginBottom: 16,
        resizeMode: 'contain',
        backgroundColor: '#111111',
        borderWidth: 1,
        borderColor: '#292929',
    },

    headerInfo: {
        alignItems: 'center',
        marginBottom: 24,
    },

    appName: {
        fontSize: 27,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },

    appSubtitle: {
        fontSize: 14,
        color: '#B8B8B8',
        marginTop: 5,
        textAlign: 'center',
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#101010',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#292929',
        marginBottom: 4,
    },

    titleIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    subtitle: {
        fontSize: 13,
        color: '#A7A7A7',
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 24,
        marginBottom: 10,
        paddingLeft: 4,
    },

    optionCard: {
        backgroundColor: '#121212',
        borderRadius: 18,
        padding: 14,
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
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: '#450B16',
    },

    info: {
        flex: 1,
        paddingRight: 8,
    },

    optionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    optionDescription: {
        fontSize: 12,
        color: '#A0A0A0',
        marginTop: 5,
        lineHeight: 17,
    },

    footer: {
        alignItems: 'center',
        marginTop: 25,
    },

    footerLine: {
        width: '35%',
        height: 1,
        backgroundColor: '#292929',
        marginBottom: 18,
    },

    footerTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    version: {
        color: '#777777',
        fontSize: 11,
        marginTop: 5,
    },

});