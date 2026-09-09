import React, { useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Pressable,
    Image,
    Animated,
    Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

// IMÁGENES
const pecho = require('../assets/images/pecho.jpg');
const biceps = require('../assets/images/biceps.jpg');
const triceps = require('../assets/images/triceps.jpg');
const espalda = require('../assets/images/espalda.jpg');
const piernas = require('../assets/images/piernas.jpg');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

export default function RoutineListScreen() {

    const navigation = useNavigation<NavigationProp>();

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

    // MOVIMIENTO HORIZONTAL
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 0.45, width * 0.2],
    });

    // MOVIMIENTO VERTICAL
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
                    Mis Rutinas
                </Text>

                <Text style={styles.subtitle}>
                    Elige el entrenamiento que quieres realizar
                </Text>

                {/* PECHO */}
                <Pressable
                    style={styles.routineCard}
                    onPress={() =>
                        navigation.navigate('ChestDetail', {
                            rutina: 'Rutina de Pecho',
                        })
                    }
                >

                    <Image
                        source={pecho}
                        style={styles.routineImage}
                    />

                    <View style={styles.info}>

                        <Text style={styles.routineTitle}>
                            Pecho
                        </Text>

                        <Text style={styles.description}>
                            Pecho, hombros y tríceps
                        </Text>

                        <Text style={styles.details}>
                            5 ejercicios • 45 min
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#D90429"
                    />

                </Pressable>

                {/* BÍCEPS */}
                <Pressable
                    style={styles.routineCard}
                    onPress={() =>
                        navigation.navigate('ChestDetail', {
                            rutina: 'Rutina de Bíceps',
                        })
                    }
                >

                    <Image
                        source={biceps}
                        style={styles.routineImage}
                    />

                    <View style={styles.info}>

                        <Text style={styles.routineTitle}>
                            Bíceps
                        </Text>

                        <Text style={styles.description}>
                            Desarrollo y fuerza de brazos
                        </Text>

                        <Text style={styles.details}>
                            4 ejercicios • 35 min
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#D90429"
                    />

                </Pressable>

                {/* TRÍCEPS */}
                <Pressable
                    style={styles.routineCard}
                    onPress={() =>
                        navigation.navigate('ChestDetail', {
                            rutina: 'Rutina de Tríceps',
                        })
                    }
                >

                    <Image
                        source={triceps}
                        style={styles.routineImage}
                    />

                    <View style={styles.info}>

                        <Text style={styles.routineTitle}>
                            Tríceps
                        </Text>

                        <Text style={styles.description}>
                            Fuerza y definición de brazos
                        </Text>

                        <Text style={styles.details}>
                            4 ejercicios • 30 min
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#D90429"
                    />

                </Pressable>

                {/* ESPALDA */}
                <Pressable
                    style={styles.routineCard}
                    onPress={() =>
                        navigation.navigate('ChestDetail', {
                            rutina: 'Rutina de Espalda',
                        })
                    }
                >

                    <Image
                        source={espalda}
                        style={styles.routineImage}
                    />

                    <View style={styles.info}>

                        <Text style={styles.routineTitle}>
                            Espalda
                        </Text>

                        <Text style={styles.description}>
                            Espalda y fortalecimiento dorsal
                        </Text>

                        <Text style={styles.details}>
                            5 ejercicios • 50 min
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#D90429"
                    />

                </Pressable>

                {/* PIERNAS */}
                <Pressable
                    style={styles.routineCard}
                    onPress={() =>
                        navigation.navigate('ChestDetail', {
                            rutina: 'Rutina de Piernas',
                        })
                    }
                >

                    <Image
                        source={piernas}
                        style={styles.routineImage}
                    />

                    <View style={styles.info}>

                        <Text style={styles.routineTitle}>
                            Piernas
                        </Text>

                        <Text style={styles.description}>
                            Fuerza y resistencia de piernas
                        </Text>

                        <Text style={styles.details}>
                            6 ejercicios • 55 min
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#D90429"
                    />

                </Pressable>

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
        textShadowColor: 'rgba(0, 0, 0, 0.30)',
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
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    // TARJETAS
    routineCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 12,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 6,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    // IMAGEN
    routineImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 14,
        resizeMode: 'cover',
    },

    // INFORMACIÓN
    info: {
        flex: 1,
    },

    routineTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#222222',
    },

    description: {
        fontSize: 13,
        color: '#666666',
        marginTop: 4,
    },

    details: {
        fontSize: 12,
        color: '#999999',
        marginTop: 6,
    },

});