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
import { LinearGradient } from 'expo-linear-gradient';

const imagen = require('../assets/images/vv.jpg');

const { width, height } = Dimensions.get('window');

export default function SettingsScreen() {

    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [sounds, setSounds] = React.useState(true);

    const animatedValue = useRef(
        new Animated.Value(0)
    ).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([

                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                }),

                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }),

            ])
        ).start();

    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 0.45, width * 0.2],
    });

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [height * 0.15, -height * 0.35],
    });

    return (
        <SafeAreaView style={styles.container}>

            {/* FONDO ANIMADO */}
            <View style={StyleSheet.absoluteFill}>

                <Animated.View
                    style={[
                        styles.gradientContainer,
                        {
                            transform: [
                                { translateX },
                                { translateY },
                            ],
                        },
                    ]}
                >

                    <LinearGradient
                        colors={[
                            '#000000',
                            '#FFFFFF',
                            '#000000',
                        ]}
                        start={{
                            x: 0,
                            y: 1,
                        }}
                        end={{
                            x: 1,
                            y: 0,
                        }}
                        style={styles.gradient}
                    />

                </Animated.View>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* IMAGEN */}
                <Image
                    source={imagen}
                    style={styles.headerImage}
                />

                {/* ENCABEZADO */}
                <View style={styles.headerInfo}>

                    <Text style={styles.appName}>
                        GymPro
                    </Text>

                    <Text style={styles.appSubtitle}>
                        Tu mejor versión comienza hoy
                    </Text>

                </View>

                <Text style={styles.title}>
                    Configuración
                </Text>

                <Text style={styles.subtitle}>
                    Personaliza tu experiencia en GymPro
                </Text>

                {/* PERFIL */}
                <Text style={styles.sectionTitle}>
                    Perfil
                </Text>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color="#000000"
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
                        color="#000000"
                    />

                </Pressable>

                {/* PREFERENCIAS */}
                <Text style={styles.sectionTitle}>
                    Preferencias
                </Text>

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#000000"
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
                            false: '#CCCCCC',
                            true: '#777777',
                        }}
                        thumbColor={
                            notifications
                                ? '#000000'
                                : '#F4F4F4'
                        }
                    />

                </View>

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="moon-outline"
                            size={24}
                            color="#000000"
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
                            false: '#CCCCCC',
                            true: '#777777',
                        }}
                        thumbColor={
                            darkMode
                                ? '#000000'
                                : '#F4F4F4'
                        }
                    />

                </View>

                <View style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="volume-high-outline"
                            size={24}
                            color="#000000"
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
                            false: '#CCCCCC',
                            true: '#777777',
                        }}
                        thumbColor={
                            sounds
                                ? '#000000'
                                : '#F4F4F4'
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
                            color="#000000"
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
                        color="#000000"
                    />

                </Pressable>

                <Pressable style={styles.optionCard}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="trophy-outline"
                            size={24}
                            color="#000000"
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
                        color="#000000"
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
                            color="#000000"
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
                        color="#000000"
                    />

                </Pressable>

                <Text style={styles.version}>
                    GymPro • Versión 1.0.0
                </Text>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    gradientContainer: {
        position: 'absolute',
        width: width * 1.8,
        height: height * 1.8,
        left: -width * 0.4,
        top: -height * 0.4,
    },

    gradient: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    headerImage: {
        width: '100%',
        height: 170,
        borderRadius: 22,
        marginTop: 10,
        marginBottom: 12,
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
    },

    headerInfo: {
        alignItems: 'center',
        marginBottom: 12,
    },

    appName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 4,
    },

    appSubtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 4,
        textAlign: 'center',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 4,
    },

    subtitle: {
        fontSize: 15,
        color: '#FFFFFF',
        marginTop: 5,
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 18,
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    optionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    info: {
        flex: 1,
    },

    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222',
    },

    optionDescription: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },

    version: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 20,
        marginBottom: 30,
    },

});