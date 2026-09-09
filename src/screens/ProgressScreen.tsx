import React, { useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ProgressScreen() {

    // VALOR DE LA ANIMACIÓN
    const animatedValue = useRef(
        new Animated.Value(0)
    ).current;

    // ANIMACIÓN DEL FONDO
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

    // MOVIMIENTO DIAGONAL
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
                                {
                                    translateX,
                                },
                                {
                                    translateY,
                                },
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

            {/* CONTENIDO */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                <Text style={styles.title}>
                    Mi Progreso
                </Text>

                <Text style={styles.subtitle}>
                    Sigue avanzando hacia tus objetivos
                </Text>

                {/* PROGRESO SEMANAL */}
                <View style={styles.progressCard}>

                    <View style={styles.cardHeader}>

                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="trophy"
                                size={32}
                                color="#000000"
                            />
                        </View>

                        <View>
                            <Text style={styles.progressTitle}>
                                Progreso semanal
                            </Text>

                            <Text style={styles.smallText}>
                                Objetivo: 4 entrenamientos
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.percentage}>
                        75%
                    </Text>

                    <View style={styles.progressBackground}>
                        <View style={styles.progressBar} />
                    </View>

                    <Text style={styles.progressText}>
                        Has completado 3 de 4 entrenamientos
                    </Text>

                </View>

                {/* ESTADÍSTICAS */}
                <Text style={styles.sectionTitle}>
                    Estadísticas
                </Text>

                <View style={styles.statsContainer}>

                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="barbell"
                                size={26}
                                color="#000000"
                            />
                        </View>

                        <Text style={styles.statNumber}>
                            12
                        </Text>

                        <Text style={styles.statLabel}>
                            Entrenamientos
                        </Text>

                    </View>

                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="flame"
                                size={26}
                                color="#000000"
                            />
                        </View>

                        <Text style={styles.statNumber}>
                            8
                        </Text>

                        <Text style={styles.statLabel}>
                            Días activos
                        </Text>

                    </View>

                </View>

                {/* META */}
                <Text style={styles.sectionTitle}>
                    Meta semanal
                </Text>

                <View style={styles.goalCard}>

                    <View style={styles.goalIcon}>
                        <Ionicons
                            name="flag"
                            size={28}
                            color="#000000"
                        />
                    </View>

                    <View style={styles.goalInfo}>

                        <Text style={styles.goalTitle}>
                            4 entrenamientos
                        </Text>

                        <Text style={styles.goalText}>
                            Te falta 1 entrenamiento para completar tu meta
                        </Text>

                    </View>

                    <Text style={styles.goalNumber}>
                        3/4
                    </Text>

                </View>

                {/* RACHA */}
                <Text style={styles.sectionTitle}>
                    Tu racha
                </Text>

                <View style={styles.streakCard}>

                    <View style={styles.streakIcon}>
                        <Ionicons
                            name="flame"
                            size={32}
                            color="#FFFFFF"
                        />
                    </View>

                    <View style={styles.streakInfo}>

                        <Text style={styles.streakNumber}>
                            8 días
                        </Text>

                        <Text style={styles.streakText}>
                            Mantén tu constancia y sigue entrenando
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // FONDO ANIMADO
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
        padding: 20,
        paddingBottom: 30,
    },

    // TÍTULOS
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
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
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    // TARJETA DE PROGRESO
    progressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 22,
        elevation: 6,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 6,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    progressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111111',
    },

    smallText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },

    percentage: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 18,
    },

    progressBackground: {
        height: 12,
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        marginTop: 12,
        overflow: 'hidden',
    },

    progressBar: {
        width: '75%',
        height: '100%',
        backgroundColor: '#000000',
        borderRadius: 10,
    },

    progressText: {
        fontSize: 14,
        color: '#777777',
        marginTop: 12,
    },

    // SECCIONES
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 25,
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    // ESTADÍSTICAS
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        alignItems: 'center',
        elevation: 5,
    },

    statIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111111',
        marginTop: 8,
    },

    statLabel: {
        fontSize: 13,
        color: '#777777',
        marginTop: 4,
        textAlign: 'center',
    },

    // META
    goalCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
    },

    goalIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    goalInfo: {
        flex: 1,
    },

    goalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
    },

    goalText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },

    goalNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    // RACHA
    streakCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
    },

    streakIcon: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    streakInfo: {
        marginLeft: 14,
        flex: 1,
    },

    streakNumber: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#111111',
    },

    streakText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },

});