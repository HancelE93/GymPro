import React, { useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Animated,
    Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

const pecho = require('../assets/images/pecho.jpg');
const biceps = require('../assets/images/biceps.jpg');
const triceps = require('../assets/images/triceps.jpg');
const espalda = require('../assets/images/espalda.jpg');
const piernas = require('../assets/images/piernas.jpg');

const { width, height } = Dimensions.get('window');

const RUTINAS = {
    'Rutina de Pecho': {
        imagen: pecho,
        descripcion: 'Entrenamiento para pecho, hombros y tríceps',
        tiempo: '45',
        calorias: '320',
        ejercicios: [
            ['01', 'Press de banca', '4 series', '10 repeticiones'],
            ['02', 'Press inclinado', '3 series', '12 repeticiones'],
            ['03', 'Aperturas con mancuernas', '3 series', '12 repeticiones'],
            ['04', 'Fondos en paralelas', '3 series', '10 repeticiones'],
            ['05', 'Cruce de poleas', '3 series', '15 repeticiones'],
        ],
    },

    'Rutina de Bíceps': {
        imagen: biceps,
        descripcion: 'Entrenamiento para fuerza y desarrollo de brazos',
        tiempo: '35',
        calorias: '250',
        ejercicios: [
            ['01', 'Curl con barra', '4 series', '10 repeticiones'],
            ['02', 'Curl alterno', '3 series', '12 repeticiones'],
            ['03', 'Curl martillo', '3 series', '12 repeticiones'],
            ['04', 'Curl concentrado', '3 series', '10 repeticiones'],
        ],
    },

    'Rutina de Tríceps': {
        imagen: triceps,
        descripcion: 'Entrenamiento para fuerza y definición de brazos',
        tiempo: '30',
        calorias: '220',
        ejercicios: [
            ['01', 'Fondos en banco', '4 series', '10 repeticiones'],
            ['02', 'Extensión en polea', '3 series', '12 repeticiones'],
            ['03', 'Press francés', '3 series', '10 repeticiones'],
            ['04', 'Extensión con mancuerna', '3 series', '12 repeticiones'],
        ],
    },

    'Rutina de Espalda': {
        imagen: espalda,
        descripcion: 'Entrenamiento para espalda y dorsales',
        tiempo: '50',
        calorias: '350',
        ejercicios: [
            ['01', 'Dominadas', '4 series', '8 repeticiones'],
            ['02', 'Remo con barra', '4 series', '10 repeticiones'],
            ['03', 'Jalón al pecho', '3 series', '12 repeticiones'],
            ['04', 'Remo en máquina', '3 series', '12 repeticiones'],
            ['05', 'Pullover en polea', '3 series', '15 repeticiones'],
        ],
    },

    'Rutina de Piernas': {
        imagen: piernas,
        descripcion: 'Entrenamiento para fuerza y resistencia',
        tiempo: '55',
        calorias: '400',
        ejercicios: [
            ['01', 'Sentadilla', '4 series', '10 repeticiones'],
            ['02', 'Prensa de piernas', '4 series', '12 repeticiones'],
            ['03', 'Extensión de piernas', '3 series', '12 repeticiones'],
            ['04', 'Curl femoral', '3 series', '12 repeticiones'],
            ['05', 'Elevación de pantorrillas', '4 series', '15 repeticiones'],
        ],
    },
};

export default function ChestDetailScreen() {

    const route = useRoute<any>();

    const nombreRutina =
        route.params?.rutina || 'Rutina de Pecho';

    const rutina =
        RUTINAS[nombreRutina as keyof typeof RUTINAS]
        || RUTINAS['Rutina de Pecho'];

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

                {/* IMAGEN PRINCIPAL */}
                <Image
                    source={rutina.imagen}
                    style={styles.heroImage}
                />

                <Text style={styles.title}>
                    {nombreRutina}
                </Text>

                <Text style={styles.subtitle}>
                    {rutina.descripcion}
                </Text>

                {/* RESUMEN */}
                <View style={styles.summaryCard}>

                    <View style={styles.summaryItem}>

                        <View style={styles.summaryIcon}>
                            <Ionicons
                                name="barbell-outline"
                                size={24}
                                color="#000000"
                            />
                        </View>

                        <Text style={styles.summaryNumber}>
                            {rutina.ejercicios.length}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Ejercicios
                        </Text>

                    </View>

                    <View style={styles.summaryItem}>

                        <View style={styles.summaryIcon}>
                            <Ionicons
                                name="time-outline"
                                size={24}
                                color="#000000"
                            />
                        </View>

                        <Text style={styles.summaryNumber}>
                            {rutina.tiempo}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Minutos
                        </Text>

                    </View>

                    <View style={styles.summaryItem}>

                        <View style={styles.summaryIcon}>
                            <Ionicons
                                name="flame-outline"
                                size={24}
                                color="#000000"
                            />
                        </View>

                        <Text style={styles.summaryNumber}>
                            {rutina.calorias}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Calorías
                        </Text>

                    </View>

                </View>

                {/* EJERCICIOS */}
                <Text style={styles.sectionTitle}>
                    Ejercicios
                </Text>

                {rutina.ejercicios.map((ejercicio) => (

                    <ExerciseCard
                        key={ejercicio[0]}
                        number={ejercicio[0]}
                        name={ejercicio[1]}
                        sets={ejercicio[2]}
                        reps={ejercicio[3]}
                    />

                ))}

            </ScrollView>

        </SafeAreaView>
    );
}

interface ExerciseCardProps {
    number: string;
    name: string;
    sets: string;
    reps: string;
}

function ExerciseCard({
    number,
    name,
    sets,
    reps,
}: ExerciseCardProps) {

    return (
        <View style={styles.exerciseCard}>

            <View style={styles.numberBox}>

                <Text style={styles.number}>
                    {number}
                </Text>

            </View>

            <View style={styles.exerciseInfo}>

                <Text style={styles.exerciseName}>
                    {name}
                </Text>

                <Text style={styles.exerciseDetails}>
                    {sets} • {reps}
                </Text>

            </View>

            <Ionicons
                name="checkmark-circle-outline"
                size={28}
                color="#000000"
            />

        </View>
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
        padding: 20,
        paddingBottom: 30,
    },

    heroImage: {
        width: '100%',
        height: 220,
        borderRadius: 22,
        marginBottom: 18,
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
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
        marginTop: 6,
        marginBottom: 20,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-around',
        elevation: 6,
    },

    summaryItem: {
        alignItems: 'center',
    },

    summaryIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111111',
        marginTop: 6,
    },

    summaryLabel: {
        fontSize: 12,
        color: '#777777',
        marginTop: 2,
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 25,
        marginBottom: 12,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 3,
    },

    exerciseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
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

    numberBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    number: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },

    exerciseInfo: {
        flex: 1,
    },

    exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222',
    },

    exerciseDetails: {
        fontSize: 13,
        color: '#777777',
        marginTop: 4,
    },

});